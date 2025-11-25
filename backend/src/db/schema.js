import { pgTable, serial, text, timestamp, integer, date, boolean } from "drizzle-orm/pg-core";

export const favoritesTable = pgTable("favorites", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    recipeId: integer("recipe_id").notNull(),
    title: text("title").notNull(),
    image: text("image"),
    cookTime: text("cook_time"),
    servings: text("servings"),
    createdAt: timestamp("created_at").defaultNow(),
})

export const pantryItemsTable = pgTable("pantry_items", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    quantity: text("quantity"),
    brand: text("brand"),
    expiration: date("expiration"),
    notes: text("notes"),
    category: text("category").default('Other'),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})

export const savedRecipesTable = pgTable('saved_recipes', {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    ingredients: text("ingredients").notNull(), // JSON string of ingredients used
    filters: text("filters"), // JSON string of filters applied
    recipe: text("recipe").notNull(), // The full AI generated recipe
    cookTime: text("cook_time"),
    servings: text("servings"),
    nutritionInfo: text("nutrition_info"), // JSON string
    createdAt: timestamp("created_at").defaultNow(),
})