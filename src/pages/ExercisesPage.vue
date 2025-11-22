<template>
  <div class="container mt-5">
    <h1 class="mb-4">Exercises for {{ muscle.toUpperCase() }}</h1>

    <!-- Selector de músculo -->
    <div class="mb-4">
      <select v-model="muscle" @change="loadExercises" class="form-select w-auto">
        <option value="biceps">Biceps</option>
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="legs">Legs</option>
        <option value="shoulders">Shoulders</option>
      </select>
    </div>

    <!-- Mostrar estado -->
    <div v-if="loading" class="text-center">Loading exercises...</div>
    <div v-else-if="error" class="text-center text-danger">Error: {{ error }}</div>

    <!-- Lista de ejercicios -->
    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="ex in exercises" :key="ex.name">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ ex.name }}</h5>
            <p class="card-text"><strong>Muscle:</strong> {{ ex.muscle }}</p>
            <p class="card-text"><strong>Type:</strong> {{ ex.type }}</p>
            <p class="card-text"><strong>Equipment:</strong> {{ ex.equipment }}</p>
            <p class="card-text"><strong>Difficulty:</strong> {{ ex.difficulty }}</p>
            <p class="card-text small">{{ ex.instructions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getExercises, Exercise } from '../data/Exercise'

const exercises = ref<Exercise[]>([])
const muscle = ref('biceps')
const loading = ref(true)
const error = ref<string | null>(null)

async function loadExercises() {
  loading.value = true
  error.value = null
  try {
    exercises.value = await getExercises(muscle.value)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadExercises()
})
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
