import { ref } from 'vue';
import { Product } from '../types';

const cart = ref<Product[]>([]);

export function useCart() {
  const addToCart = (product: Product) => {
    cart.value.push(product);
  };

  return {
    cart,
    addToCart,
  };
}