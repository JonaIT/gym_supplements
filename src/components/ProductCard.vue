
<template>
  <div class="card h-100">
    <img :src="product.image" class="card-img-top" :alt="product.name" style="height: 300px; object-fit: contain; padding: 10px;" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <p class="card-text fw-bold">${{ product.price.toFixed(2) }}</p>
      <button class="btn btn-primary mt-auto" @click="cartStore.addToCart(product)">Añadir al carrito</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type Product } from '../store/cart';

defineProps<{ product: Product }>();

const cartStore = useCartStore();
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
