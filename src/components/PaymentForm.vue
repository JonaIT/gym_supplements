
<template>
  <div v-if="show" class="modal-overlay">
    <div class="payment-form-content">
      <h2 class="payment-form-title">Datos de la Tarjeta</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombre en la Tarjeta</label>
          <input type="text" id="name" v-model="cardData.name" />
        </div>
        <div class="form-group">
          <label for="cardNumber">Número de Tarjeta</label>
          <input type="text" id="cardNumber" v-model="cardData.cardNumber" maxlength="16" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="expiry">Fecha de Expiración (MM/AA)</label>
            <input type="text" id="expiry" v-model="cardData.expiry" @input="formatExpiry" placeholder="MM/AA" />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="cardData.cvv" maxlength="3" />
          </div>
        </div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="form-actions">
          <button type="submit" class="submit-payment-button">Pagar</button>
          <button type="button" @click="onClose" class="cancel-payment-button">Cancelar</button>
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
  (e: 'submit'): void;
}>();

const cardData = ref({
  name: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
});
const error = ref('');

const formatExpiry = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/[^0-9]/g, '');
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  } else if (value.length === 2 && cardData.value.expiry.length < 3) {
    value = value + '/';
  }
  cardData.value.expiry = value;
};

const handleSubmit = () => {
  if (!cardData.value.name || !cardData.value.cardNumber || !cardData.value.expiry || !cardData.value.cvv) {
    error.value = 'Por favor, complete todos los campos.';
    return;
  }
  if (cardData.value.cardNumber.length < 16) {
    error.value = 'El numero de la tarjeta debe contener 16 digitos.';
    return;
  }
  if (cardData.value.cvv.length < 3) {
    error.value = 'El cvv de la tarjeta debe contener 3 digitos.';
    return;
  }
  error.value = '';
  emit('submit');
};

const onClose = () => {
  emit('close');
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    cardData.value = { name: '', cardNumber: '', expiry: '', cvv: '' };
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

.payment-form-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
    animation: fadeIn 0.3s ease-out;
}

.payment-form-title {
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

.submit-payment-button,
.cancel-payment-button {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.2s ease;
}

.submit-payment-button {
    background-color: #2ecc71;
    color: white;
}

.submit-payment-button:hover {
    background-color: #27ae60;
}

.cancel-payment-button {
    background-color: #e74c3c;
    color: white;
}

.cancel-payment-button:hover {
    background-color: #c0392b;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
</style>
