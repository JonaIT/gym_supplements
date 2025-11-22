
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Our Supplements</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <product-card :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products } from '../data/products';
import ProductCard from '../components/ProductCard.vue';
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
