
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 1. Definir la estructura de un producto
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

// 2. Definir la estructura de un ítem en el carrito (producto + cantidad)
export interface CartItem extends Product {
  quantity: number;
}

// 3. Crear la tienda Pinia
export const useCartStore = defineStore('cart', () => {
  // STATE
  const cartItems = ref<CartItem[]>([]);

  // GETTERS
  const getCartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  const getItemCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0);
  });

  // ACTIONS
  function addToCart(product: Product) {
    const itemInCart = cartItems.value.find(item => item.id === product.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      cartItems.value.push({ ...product, quantity: 1 });
    }
  }

  function removeFromCart(productId: number) {
    const itemInCart = cartItems.value.find(item => item.id === productId);
    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        itemInCart.quantity--;
      } else {
        cartItems.value = cartItems.value.filter(item => item.id !== productId);
      }
    }
  }

  function clearCart() {
    cartItems.value = [];
  }

  return {
    cartItems,
    getCartTotal,
    getItemCount,
    addToCart,
    removeFromCart,
    clearCart,
  };
});
