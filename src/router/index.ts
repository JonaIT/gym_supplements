import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ProductsPage from '../pages/ProductsPage.vue';
import CartPage from '../pages/CartPage.vue';
import ExercisesPage from '../pages/ExercisesPage.vue';
import SupplementsPage from '../pages/SuplementsPage.vue';
import MealPage from '../pages/MealPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: ExercisesPage,
  },
  {
    path: '/supplements',
    name: 'Supplements',
    component: SupplementsPage,
  },
  {
    path: '/meals',
    name: 'Meals',
    component: MealPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
