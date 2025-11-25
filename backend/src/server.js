import express from "express"
import { ENV } from "./config/env.js"
import {db} from "./config/db.js"
import { and, eq } from "drizzle-orm";
import { favoritesTable, pantryItemsTable  } from "./db/schema.js"
import job from "./config/cron.js"
import OpenAI from 'openai';

const app = express()
const PORT = ENV.PORT || 5001

//OpenAI intialization
const openai = new OpenAI({
    apiKey: ENV.OPENAI_API_KEY || process.env.OPENAI_API_KEY
});


if(ENV.NODE_ENV==="production") job.start()


app.use(express.json())

app.get("/api/health", (req, res) => {
    res.status(200).json({success:true});
});

// ============ PANTRY ENDPOINTS ============

// Get all pantry items for a user
app.get('/api/pantry/:userId', async (req,res) => {
    try {
        const { userId } = req.params;

        const pantryItems = await db.select()
            .from(pantryItemsTable)
            .where(eq(pantryItemsTable.userId, userId));
        
        // Check for expired
        const today = new Date();
        const itemsWithStatus = pantryItems.map(item => {
            if(item.expiration) {
                const expDate = new Date(item.expiration)
                const daysUntilExpiry = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24))
            
                return {
                    ...item,
                    isExpired: daysUntilExpiry < 0,
                    isExpiringSoon: daysUntilExpiry >= 0 && daysUntilExpiry <= 3,
                    daysUntilExpiry
                };
            }
            return item;
        });
        res.status(200).json(itemsWithStatus);
    } catch(error) {
        console.error("Error fetching pantry items:", error);
        res.status(500).json({error: "Failed to fetch pantry items"});
    }
})

// Add pantry item
app.post('/api/pantry', async (req,res) => {
    try {
        const { userId, name, quantity, brand, expiration, notes, category } = req.body;

        if(!userId || !name) {
            return res.status(400).json({error: "UserId and name are required!"})
        }

        const newItem = await db.insert(pantryItemsTable)
            .values({
                userId,
                name,
                quantity,
                brand,
                expiration: expiration ? new Date(expiration) : null,
                notes,
                category
            })
            .returning();

        res.status(201).json(newItem[0]);

    } catch (error) {
        console.error("Error adding pantry item:", error);
        res.status(500).json({error: "Failed to add pantry item"})
    }
});

// Delete item
app.delete("/api/pantry/:id", async (req,res) => {
    try {
        const { id } = req.params;

        await db.delete(pantryItemsTable) 
            .where(eq(pantryItemsTable.id, parseInt(id)))
        
        res.status(200).json({message: "Item deleted successfully"})
    } catch (error) {
        console.error("Error deleting pantry item:", error);
        res.status(500).json({error: 'Failed to delete pantry item'});
    }
});

// Update pantry item
app.put('/api/pantry/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedItem = await db.update(pantryItemsTable)
            .set({
                ...updates,
                updatedAt: new Date()
            })
            .where(eq(pantryItemsTable.id, parseInt(id)))
            .returning()
        res.status(200).json(updatedItem[0]);
    } catch (error) {
        console.error("Error updating pantry item:", error);
        res.status(500).json({ error: "Failed to update pantry item" });
    }
})




// ============ AI RECIPE GENERATION ============

// Generate recipe using OpenAI

app.post("/api/recipes/generate", async (req,res) => {
    try {
        const { userId, ingredients, filters } = req.body;

        if (!userId || !ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: "UserId and ingredients are required" });
        }

        // Prompt creation
        const ingredientList = ingredients.join(", ");
        const filterText = filters && filters.length > 0 ? `Requirements: ${filters.join(", ")}` : "";
        const isStrictMode = filters && filters.includes('strict-ingredients');
        const priorityIngredients = req.body.priorityIngredients || [];
        const allIngredients = req.body.ingredients;

        const systemMessage = isStrictMode ? 
        "You are a professional chef who creates delicious, restaurant-quality recipes. You must ONLY use the ingredients provided - do NOT suggest buying anything additional. Only basic seasonings (salt, pepper, oil) may be added. Create recipes that actually taste good and make culinary sense. If ingredients don't go well together, leave some out rather than forcing weird combinations. Follow traditional cooking principles."
        :
        "You are a professional chef who creates delicious, restaurant-quality recipes. Prioritize making food that actually tastes good over using every ingredient,  quality over quantity - better to use 3 ingredients well than 10 ingredients poorly. Follow established culinary traditions and proven flavor combinations. You may suggest buying 2-4 common ingredients to complete a proper recipe, clearly marked with [TO BUY].";


        const demo = `For example, if pantry = ["chicken breast","lemon","garlic","olive oil"], reply:

        RECIPE NAME: Lemon-Garlic Chicken Skillet
        COOKING TIME: 25 minutes
        SERVINGS: 2
        INGREDIENTS:
        - 2 chicken breasts
        - 1 lemon, zested and juiced
        - 3 cloves garlic, minced
        - 2 tbsp olive oil
        INSTRUCTIONS:
        1. Season chicken with salt & pepper...
        CHEF’S TIP: Rest chicken under foil for 5 min.
        `;

        const priorityText = priorityIngredients.length
        ? `The user especially wants to use: ${priorityIngredients.join(", ")}.`
        : "";

        const prompt = `
            ${demo}

            Pantry: ${allIngredients.join(", ")}

            ${priorityText}

            ${filterText}

            Create ONE restaurant-quality recipe using only these ingredients. 
            • Use home-cook measures (cups, tbsp, pieces), rounded to whole/½. 
            • Choose ONE cuisine; omit ingredients that don’t fit. 
            • In strict mode: do NOT suggest buying anything extra. 
            • In lenient mode: you MAY suggest up to 4 items [TO BUY], only if needed.
            • If no cohesive dish is possible, apologize and suggest up to 3 missing staples.

            Format **exactly** as:

            RECIPE NAME: …
            COOKING TIME: … minutes
            SERVINGS: …
            INGREDIENTS:
            - …
            INSTRUCTIONS:
            1. …
            NUTRITIONAL INFO (per serving):
            - Calories: …
            - Protein: …g
            - Carbs: …g
            - Fat: …g
            CHEF’S TIP: …
            `;
        
        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "system",
                    content: systemMessage
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        const recipe = completion.choices[0].message.content;


        res.status(200).json({
            recipe: recipe
        });
    } catch (error) {
        console.error("Error generating recipe:", error);
        res.status(500).json({ error: "Failed to generate recipe" });
    }

})

    app.get("/api/recipes/history/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        
        const recipes = await db.select()
            .from(generatedRecipesTable)
            .where(eq(generatedRecipesTable.userId, userId))
            .orderBy(generatedRecipesTable.createdAt);
        
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipe history:", error);
        res.status(500).json({ error: "Failed to fetch recipe history" });
    }
});








app.post("/api/favorites", async (req,res) => {
    try {
        const {userId, recipeId, title, image, cookTime, servings } = req.body;

        if(!userId || !recipeId || !title) {
            return res.status(400).json({ error: "Missing Required Field" });
        }

        const newFav = await db.insert(favoritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        }).returning();

        res.status(201).json(newFav[0])
    
    } catch(error) {
        console.log("Error adding favorite", error)
        res.status(500).json({error: "Internal Error!"})
    }
    
})

app.post("/api/favorites/:userId/:recipeId", async(req,res) => {
    try{  
        const {userId, recipeId} = req.params

        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId,userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
        )

        res.status(200).json({ message: "Favorite deleted successfully!"});

     } catch(error) {
        console.log("Error adding favorite", error)
        res.status(500).json({error: "Internal Error!"})
    }

})

app.get("/api/favorites/:userId/", async(req,res) => {
    try{  
        const{userId} = req.params

        const userFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId))

        res.status(200).json(userFavorites);


     } catch(error) {
        console.log("Error adding favorite", error)
        res.status(500).json({error: "Internal Error!"})
    }

})

app.listen(5001, ()=> {
    console.log("Running on PORT:", PORT)
});