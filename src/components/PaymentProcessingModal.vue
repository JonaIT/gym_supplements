
<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2 class="processing-title">Procesando Pago</h2>
      <div class="credit-card">
        <div class="card-chip"></div>
        <div class="card-number">**** **** **** 1234</div>
        <div class="card-footer">
          <div class="card-holder-name">CLIENTE</div>
          <div class="card-logo"></div>
        </div>
      </div>
      <div class="processing-spinner"></div>
      <p class="processing-text">Por favor, espere...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean }>();
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

.modal-content {
    background-color: #ffffff;
    padding: 2rem 3rem;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.3s ease-out;
}

.processing-title {
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #333;
}

.credit-card {
    width: 280px;
    height: 170px;
    background: linear-gradient(45deg, #3a7bd5, #3a6073);
    border-radius: 15px;
    margin: 0 auto 1.5rem;
    padding: 20px;
    color: white;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease-out, pulse 2s infinite ease-in-out 1s;
}

.card-chip {
    width: 40px;
    height: 30px;
    background: #ffc107;
    border-radius: 4px;
}

.card-number {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2rem;
    margin-top: 1.5rem;
    text-align: left;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1rem;
}

.card-holder-name {
    font-size: 0.9rem;
}

.card-logo {
    width: 50px;
    height: 30px;
    background-image: radial-gradient(circle at 60% 0%, #f00 25%, transparent 26%),
                      radial-gradient(circle at 40% 100%, #ff0 25%, transparent 26%);
    background-color: transparent;
    border-radius: 50%;
}

.processing-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
}

.processing-text {
    color: #555;
    font-size: 1.1rem;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes slideIn {
    from { opacity: 0; transform: translateY(-50px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
