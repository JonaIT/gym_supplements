
<template>
  <div>
    <!-- Hero Section -->
    <div class="hero-section text-center p-5 mb-5">
      <div class="container">
        <h1>Welcome to Gym Supplements</h1>
        <p>Your one-stop shop for all your fitness needs.</p>
        <router-link to="/products" class="btn btn-primary">Shop Now</router-link>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="container">
      <h2 class="mb-4 text-center">Featured Products</h2>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="product in featuredProducts" :key="product.id">
          <product-card :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard.vue';
import type { Product } from '../store/cart';

const featuredProducts = ref<Product[]>(products.slice(0, 3));
</script>

<style scoped>
.hero-section {
  background-color: #f8f9fa;
}
</style>
