
<template>
  <div>
    <div class="cart-page-container">
      <h1 class="cart-title">Tu Carrito de Compras</h1>
      <div v-if="cartItems.length === 0">
        <p class="empty-cart-message">Tu carrito está vacío.</p>
      </div>
      <div v-else class="cart-content">
        <div class="cart-items-list">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="cart-item-image" />
            <div class="cart-item-details">
              <h2 class="cart-item-name">{{ item.name }}</h2>
              <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
              <p class="cart-item-quantity">Cantidad: {{ item.quantity }}</p>
            </div>
            <button @click="removeFromCart(item.id)" class="remove-item-button">Eliminar</button>
          </div>
        </div>
        <div class="cart-summary">
          <h2 class="summary-title">Resumen del Pedido</h2>
          <div class="summary-total">
            <span>Total:</span>
            <span>${{ getCartTotal.toFixed(2) }}</span>
          </div>
          <button @click="handleProceedToPayment" class="checkout-button">Proceder al Pago</button>
          <button @click="clearCart" class="clear-cart-button">Vaciar Carrito</button>
        </div>
      </div>
    </div>

    <PaymentForm 
      :show="showPaymentForm" 
      @close="showPaymentForm = false" 
      @submit="handlePaymentSubmit" 
    />

    <PaymentProcessingModal :show="isProcessing" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../store/cart';
import { storeToRefs } from 'pinia';
import PaymentProcessingModal from '../components/PaymentProcessingModal.vue';
import PaymentForm from '../components/PaymentForm.vue';
import './CartPage.css';

const cartStore = useCartStore();
const { cartItems, getCartTotal } = storeToRefs(cartStore);
const { removeFromCart, clearCart } = cartStore;

const isProcessing = ref(false);
const showPaymentForm = ref(false);

const handleProceedToPayment = () => {
  showPaymentForm.value = true;
};

const handlePaymentSubmit = () => {
  showPaymentForm.value = false;
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    clearCart();
    alert('¡Gracias por tu compra! El pago ha sido procesado exitosamente.');
  }, 4000);
};
</script>
