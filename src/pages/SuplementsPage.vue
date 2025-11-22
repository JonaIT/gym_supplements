<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">🏋️‍♂️ Gym Supplements</h1>

    <!-- Filtros de búsqueda -->
    <div class="row mb-4">
      <div class="col-md-6 mx-auto">
        <div class="input-group">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Buscar suplementos..."
            @keyup.enter="loadSupplements"
          />
          <button class="btn btn-primary" @click="loadSupplements">
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
          @click="searchByCategory(cat.value)"
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
      <p class="mt-2">Loading supplements...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center" role="alert">
      Error: {{ error }}
    </div>

    <!-- Información de resultados -->
    <div v-else-if="supplements.length > 0" class="mb-3 text-center text-muted">
      Mostrando {{ supplements.length }} suplementos
    </div>

    <!-- Lista de suplementos -->
    <div v-if="!loading && !error" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="supp in supplements" :key="supp.id">
        <div class="card h-100 shadow-sm">
          <img :src="supp.image" class="card-img-top" :alt="supp.title" />
          
          <div class="card-body">
            <h5 class="card-title">{{ supp.title }}</h5>
            <p class="badge bg-info text-dark mb-2">{{ supp.category }}</p>
            <p class="card-text small">{{ supp.description }}</p>

            <!-- Información nutricional -->
            <div class="nutrition-info mt-3">
              <h6 class="text-muted">Información Nutricional (por 100g):</h6>
              <div class="row g-2 informacion">
                <div class="col-6" v-if="supp.nutrition.calories">
                  <small><strong>Calorías:</strong> {{ supp.nutrition.calories.toFixed(0) }} kcal</small>
                </div>
                <div class="col-6" v-if="supp.nutrition.protein">
                  <small><strong>Proteínas:</strong> {{ supp.nutrition.protein.toFixed(1) }}g</small>
                </div>
                <div class="col-6" v-if="supp.nutrition.carbs">
                  <small><strong>Carbohidratos:</strong> {{ supp.nutrition.carbs.toFixed(1) }}g</small>
                </div>
                <div class="col-6" v-if="supp.nutrition.fat">
                  <small><strong>Grasas:</strong> {{ supp.nutrition.fat.toFixed(1) }}g</small>
                </div>
              </div>
            </div>

            <p class="card-text mt-3">
              <strong class="text-success">💰 ${{ supp.price.toFixed(2) }}</strong>
            </p>
          </div>

          <div class="card-footer text-center bg-light">
            ⭐ {{ supp.rating.rate }} / 5 
            <small class="text-muted">({{ supp.rating.count }} reviews)</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Sin resultados -->
    <div v-if="!loading && !error && supplements.length === 0" class="text-center my-5">
      <p class="text-muted">No se encontraron suplementos. Intenta con otra búsqueda.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getSupplements, getSupplementsByCategory, Supplement } from "../data/Supplement";

const supplements = ref<Supplement[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const searchQuery = ref("protein");

const quickCategories = [
  { label: "Whey Protein", value: "whey" },
  { label: "Creatina", value: "creatine" },
  { label: "BCAA", value: "bcaa" },
  { label: "Pre-Workout", value: "preworkout" },
  { label: "Mass Gainer", value: "gainer" },
];

async function loadSupplements() {
  loading.value = true;
  error.value = null;
  try {
    supplements.value = await getSupplements(searchQuery.value, 50);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

async function searchByCategory(category: string) {
  loading.value = true;
  error.value = null;
  searchQuery.value = category;
  try {
    supplements.value = await getSupplementsByCategory(category);
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadSupplements();
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
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.nutrition-info {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border-left: 3px solid #007bff;
}

.badge {
  font-size: 0.75rem;
}

.btn-outline-secondary:hover {
  background-color: #007bff;
  border-color: #007bff;
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

.informacion{
    color: #000000ff;
}
</style>