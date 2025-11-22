export interface Meal {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
}

export async function getMealsByCategory(category: string = "Chicken"): Promise<Meal[]> {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );

    if (!response.ok) {
        throw new Error(`Error al obtener recetas: ${response.status}`);
    }

    const data = await response.json();
    return data.meals;
}

export async function getMealDetails(mealId: string): Promise<Meal> {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );

    if (!response.ok) {
        throw new Error(`Error al obtener detalles: ${response.status}`);
    }

    const data = await response.json();
    return data.meals[0];
}