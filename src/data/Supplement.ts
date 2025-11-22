
export interface USDANutrient {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
    rank?: number;
}

export interface USDAFood {
    fdcId: number;
    description: string;
    dataType: string;
    publishedDate: string;
    foodCategory?: string;
    score: number;
    foodNutrients: USDANutrient[];
}

export interface USDAResponse {
    totalHits: number;
    currentPage: number;
    totalPages: number;
    foods: USDAFood[];
}

export interface Supplement {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    nutrition: {
        calories?: number;
        protein?: number;
        carbs?: number;
        fat?: number;
        fiber?: number;
        sugar?: number;
    };
}

const API_KEY = "dz46ql69YCKC9BwTJ3l568q4QgxazsJ8iVi5lWLi";
const BASE_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

export async function getSupplements(query: string = "protein", pageSize: number = 50): Promise<Supplement[]> {
    const url = `${BASE_URL}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&pageSize=${pageSize}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al obtener suplementos: ${response.status}`);
    }

    const data: USDAResponse = await response.json();
    console.log("Datos USDA:", data);

    return data.foods.map((food, index) => convertUSDAToSupplement(food, index));
}

function convertUSDAToSupplement(food: USDAFood, index: number): Supplement {
    const nutrients = extractNutrients(food.foodNutrients);

    const proteinValue = nutrients.protein || 0;
    const basePrice = 15 + (proteinValue / 100 * 45);

    const ratingRate = Math.min(5, Math.max(3, food.score / 100));
    const ratingCount = Math.floor(Math.random() * 500) + 50;

    return {
        id: food.fdcId,
        title: food.description,
        price: parseFloat(basePrice.toFixed(2)),
        description: `${food.foodCategory || 'Supplement'} - High quality nutritional product`,
        category: food.foodCategory || "Supplements",
        image: getSupplementImage(food.description, index),
        rating: {
            rate: parseFloat(ratingRate.toFixed(1)),
            count: ratingCount
        },
        nutrition: nutrients
    };
}

function extractNutrients(foodNutrients: USDANutrient[]) {
    const nutrients: any = {};

    foodNutrients.forEach(nutrient => {
        const name = nutrient.nutrientName.toLowerCase();

        if (name.includes('energy') && nutrient.unitName === 'KCAL') {
            nutrients.calories = nutrient.value;
        } else if (name.includes('protein')) {
            nutrients.protein = nutrient.value;
        } else if (name.includes('carbohydrate')) {
            nutrients.carbs = nutrient.value;
        } else if (name === 'total lipid (fat)' || name.includes('fat')) {
            nutrients.fat = nutrient.value;
        } else if (name.includes('fiber')) {
            nutrients.fiber = nutrient.value;
        } else if (name.includes('total sugars')) {
            nutrients.sugar = nutrient.value;
        }
    });

    return nutrients;
}

function getSupplementImage(description: string, index: number): string {
    const desc = description.toLowerCase();

    if (desc.includes('whey') || desc.includes('protein isolate')) {
        return `https://picsum.photos/300/300?random=${index + 1}`;
    } else if (desc.includes('creatine')) {
        return `https://picsum.photos/300/300?random=${index + 100}`;
    } else if (desc.includes('bcaa') || desc.includes('amino')) {
        return `https://picsum.photos/300/300?random=${index + 200}`;
    } else if (desc.includes('gainer') || desc.includes('mass')) {
        return `https://picsum.photos/300/300?random=${index + 300}`;
    } else {
        return `https://picsum.photos/300/300?random=${index + 400}`;
    }
}

export async function getSupplementsByCategory(category: string): Promise<Supplement[]> {
    const queries: { [key: string]: string } = {
        'whey': 'whey protein isolate',
        'creatine': 'creatine monohydrate',
        'bcaa': 'branched chain amino acids',
        'preworkout': 'pre workout supplement',
        'gainer': 'mass gainer protein',
        'glutamine': 'l-glutamine',
        'omega3': 'omega 3 fish oil'
    };

    const query = queries[category.toLowerCase()] || category;
    return getSupplements(query, 30);
}

export async function getAllSupplementCategories(): Promise<{ category: string; supplements: Supplement[] }[]> {
    const categories = ['whey', 'creatine', 'bcaa', 'gainer'];
    
    const results = await Promise.all(
        categories.map(async (cat) => ({
            category: cat,
            supplements: await getSupplementsByCategory(cat)
        }))
    );

    return results;
}