export interface Exercise {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

const API_KEY = "aaAzqFT783YFvvU8X7T6+g==bbFHkUY8OKVvRPzN";

export async function getExercises(muscle: string): Promise<Exercise[]> {
    const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        headers: {
            "X-Api-Key": API_KEY
        }
    });

    if (!response.ok) {
        throw new Error(`Error al obtener ejercicios: ${response.status}`);
    }
    const data = await response.json(); 
    console.log(data); 
    return data;
}