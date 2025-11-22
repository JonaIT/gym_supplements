
<template>
  <div style="display: flex; flex-direction: column; min-height: 100vh">
    <app-navbar />
    <main style="flex: 1">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './components/Navbar.vue';
import AppFooter from './components/Footer.vue';
</script>

<style>
/* Global styles can go here */
</style>
