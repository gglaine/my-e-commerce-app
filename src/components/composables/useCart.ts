import { ref, computed } from 'vue';
import { Product } from '../types';

const cart = ref<Product[]>([]);
const showFlashNotification = ref(false);

export function useCart() {

  const addToCart = (product: Product) => {
    cart.value.push(product);
    showFlashNotification.value = true;
    setTimeout(() => {
      showFlashNotification.value = false;
    }, 1000); // Hide after 1 second
  };

  const removeFromCart = (product: Product) => {
    const index = cart.value.findIndex(item => item.id === product.id);
    if (index > -1) {
      cart.value.splice(index, 1);
    }
  };




  const cartLength = computed(() => cart.value.length);

  return {
    cart,
    addToCart,
    removeFromCart,
    cartLength
  };
}