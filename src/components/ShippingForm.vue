
<template>
  <div v-if="show" class="modal-overlay">
    <div class="shipping-form-content">
      <h2 class="shipping-form-title">Información de Envío</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="fullName">Nombre Completo</label>
          <input type="text" id="fullName" v-model="shippingData.fullName" />
        </div>
        <div class="form-group">
          <label for="address">Dirección</label>
          <input type="text" id="address" v-model="shippingData.address" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <input type="text" id="city" v-model="shippingData.city" />
          </div>
          <div class="form-group">
            <label for="postalCode">Código Postal</label>
            <input type="text" id="postalCode" v-model="shippingData.postalCode" />
          </div>
        </div>
        <div class="form-group">
          <label for="country">País</label>
          <input type="text" id="country" v-model="shippingData.country" />
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="form-actions">
          <button type="submit" class="submit-shipping-button">Continuar al Pago</button>
          <button type="button" @click="onClose" class="cancel-shipping-button">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ 
  show: boolean 
}>();

const emit = defineEmits<{ 
  (e: 'close'): void;
  (e: 'submit', shippingData: any): void;
}>();

const shippingData = ref({
  fullName: '',
  address: '',
  city: '',
  postalCode: '',
  country: ''
});
const error = ref('');

const handleSubmit = () => {
  if (!shippingData.value.fullName || !shippingData.value.address || !shippingData.value.city || !shippingData.value.postalCode || !shippingData.value.country) {
    error.value = 'Por favor, complete todos los campos de envío.';
    return;
  }
  error.value = '';
  emit('submit', shippingData.value);
};

const onClose = () => {
  emit('close');
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    shippingData.value = { fullName: '', address: '', city: '', postalCode: '', country: '' };
    error.value = '';
  }
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.shipping-form-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    animation: fadeIn 0.3s ease-out;
}

.shipping-form-title {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-row .form-group {
    flex: 1;
}

.error-message {
    color: #e74c3c;
    text-align: center;
    margin-bottom: 1rem;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1.5rem;
}

.submit-shipping-button,
.cancel-shipping-button {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.submit-shipping-button {
    background-color: #2ecc71;
    color: white;
}

.submit-shipping-button:hover {
    background-color: #27ae60;
}

.cancel-shipping-button {
    background-color: #e74c3c;
    color: white;
}

.cancel-shipping-button:hover {
    background-color: #c0392b;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
</style>
