const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const MealAPI = {
    searchMealsByName: async (query) => {
    try {
        const response = await fetch('${BASE_URL}/search.php?s=${encodeURIComponent(query)}');
        const data = await response.json();
        return data.meals || [];
    } catch (error){
        console.error("Error searching meals by name: ", error);
        return [];
    }
    },

    getMealById: async (id) => {
        try {
            const response = await fetch('${BASE_URL}/lookup.php?i=${id')
            const data = await response.json()
            return data.meals ? data.meals[0] : null;
        } catch (error) {
            console.error("Error getting meal by id: ", error);
            return null;
        }
    },

    // lookup a single random meal
    getRandomMeal: async () => {
    try {
        const response = await fetch(`${BASE_URL}/random.php`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error("Error getting random meal:", error);
        return null;
    }
    },

}