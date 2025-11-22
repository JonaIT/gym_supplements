<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">🍽️ Meal Plans for Performance</h1>

    <!-- Filtros de búsqueda -->
    <div class="row mb-4">
      <div class="col-md-6 mx-auto">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Buscar recetas..."
            @keyup.enter="searchMeals"
          />
          <button class="btn btn-primary" @click="searchMeals">
            🔍 Buscar
          </button>
        </div>
      </div>
    </div>

    <!-- Categorías rápidas -->
    <div class="row mb-4">
      <div class="col text-center">
        <button
          v-for="cat in quickCategories"
          :key="cat.value"
          @click="loadByCategory(cat.value)"
          class="btn btn-outline-secondary btn-sm m-1"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading recipes...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center" role="alert">
      Error: {{ error }}
    </div>

    <!-- Información de resultados -->
    <div v-else-if="meals.length > 0" class="mb-3 text-center text-muted">
      Mostrando {{ meals.length }} recetas
    </div>

    <!-- Lista de recetas -->
    <div v-if="!loading && !error" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="meal in meals" :key="meal.idMeal">
        <div class="card h-100 shadow-sm">
          <img :src="meal.strMealThumb" class="card-img-top" :alt="meal.strMeal" />
          
          <div class="card-body">
            <h5 class="card-title">{{ meal.strMeal }}</h5>
            <p class="badge bg-info text-dark mb-2">{{ meal.strCategory }}</p>
            <p class="badge bg-secondary ms-2">🌍 {{ meal.strArea }}</p>
            
            <div class="instructions-preview mt-3">
              <h6 class="text-muted">Instrucciones:</h6>
              <p class="card-text small">
                {{ getPreviewText(meal.strInstructions) }}
              </p>
            </div>

            <!-- Botón para ver detalles -->
            <button 
              @click="viewDetails(meal.idMeal)"
              class="btn btn-sm btn-outline-primary mt-2 w-100"
            >
              Ver Receta Completa
            </button>

            <!-- Link a YouTube si existe -->
            <a 
              v-if="meal.strYoutube" 
              :href="meal.strYoutube" 
              target="_blank"
              class="btn btn-sm btn-danger mt-2 w-100"
            >
              📺 Ver en YouTube
            </a>
          </div>

          <div class="card-footer text-center bg-light">
            <small class="text-muted">Cocina: {{ meal.strArea }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-if="!loading && !error && meals.length === 0" class="text-center my-5">
      <p class="text-muted">No se encontraron recetas. Intenta con otra búsqueda.</p>
    </div>

    <!-- Modal para detalles de la receta -->
    <div v-if="selectedMeal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="btn-close-modal" @click="closeModal">✕</button>
        
        <img :src="selectedMeal.strMealThumb" class="modal-img" :alt="selectedMeal.strMeal" />
        
        <div class="modal-body-content">
          <h2>{{ selectedMeal.strMeal }}</h2>
          <div class="mb-3">
            <span class="badge bg-info text-dark me-2">{{ selectedMeal.strCategory }}</span>
            <span class="badge bg-secondary">🌍 {{ selectedMeal.strArea }}</span>
          </div>
          
          <h5 class="mt-4">📝 Instrucciones:</h5>
          <p class="instructions-full">{{ selectedMeal.strInstructions }}</p>
          
          <a 
            v-if="selectedMeal.strYoutube" 
            :href="selectedMeal.strYoutube" 
            target="_blank"
            class="btn btn-danger mt-3"
          >
            📺 Ver Video Tutorial
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getMealsByCategory, getMealDetails, Meal } from "../data/Meal";

const meals = ref<Meal[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref("");
const selectedMeal = ref<Meal | null>(null);

const quickCategories = [
  { label: "Pollo", value: "Chicken" },
  { label: "Carne", value: "Beef" },
  { label: "Pescado", value: "Seafood" },
  { label: "Vegetariano", value: "Vegetarian" },
  { label: "Pasta", value: "Pasta" },
  { label: "Postres", value: "Dessert" },
];

async function loadByCategory(category: string) {
  loading.value = true;
  error.value = null;
  try {
    const data = await getMealsByCategory(category);
    
    // Cargar detalles completos para las primeras 12 recetas
    const detailedMeals = await Promise.all(
      data.slice(0, 12).map(meal => getMealDetails(meal.idMeal))
    );
    
    meals.value = detailedMeals;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function searchMeals() {
  if (!searchQuery.value.trim()) {
    loadByCategory("Chicken");
    return;
  }

  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery.value)}`
    );
    
    if (!response.ok) {
      throw new Error(`Error al buscar recetas: ${response.status}`);
    }

    const data = await response.json();
    meals.value = data.meals || [];
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function viewDetails(mealId: string) {
  try {
    selectedMeal.value = await getMealDetails(mealId);
  } catch (err: any) {
    error.value = err.message;
  }
}

function closeModal() {
  selectedMeal.value = null;
}

function getPreviewText(text: string): string {
  if (!text) return "";
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
}

onMounted(() => {
  loadByCategory("Chicken");
});
</script>

<style scoped>
.card {
  border-radius: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.card-img-top {
  height: 220px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
}

.instructions-preview {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border-left: 3px solid #28a745;
  max-height: 150px;
  overflow: hidden;
}

.badge {
  font-size: 0.75rem;
}

.btn-outline-secondary:hover {
  background-color: #28a745;
  border-color: #28a745;
  color: white;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

h1 {
  font-weight: bold;
  color: #333;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  min-height: 3rem;
}

.card-text.small {
  font-size: 0.85rem;
  color: #6c757d;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
}

.btn-close-modal:hover {
  background: #dc3545;
  color: white;
  transform: rotate(90deg);
}

.modal-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem 1rem 0 0;
}

.modal-body-content {
  padding: 2rem;
}

.instructions-full {
  text-align: justify;
  line-height: 1.8;
  color: #495057;
  white-space: pre-line;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    margin: 1rem;
  }
  
  .modal-img {
    height: 200px;
  }
  
  .modal-body-content {
    padding: 1rem;
  }
}
</style>