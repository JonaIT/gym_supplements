
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Gym Supplements</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#basic-navbar-nav" aria-controls="basic-navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="basic-navbar-nav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/exercises">Exercises</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/supplements">Supplements</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/meals">Meals</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              Carrito 
              <span v-if="cartStore.getItemCount > 0" class="badge rounded-pill bg-primary">{{ cartStore.getItemCount }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
