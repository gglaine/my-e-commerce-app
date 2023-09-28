import { ref, computed } from 'vue';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

const cart = ref<CartItem[]>([]); // Refactor cart to contain CartItems
const showFlashNotification = ref(false);
const buttonAnimation = ref<Set<string>>(new Set());

export function useCart() {

  const addToCart = (product: Product) => {
    console.log("Button clicked!");

    // Check if product is already in the cart
    const existingCartItem = cart.value.find(item => item.product.id === product.id);

    if (existingCartItem) {
      // If product is in the cart, increment its quantity
      existingCartItem.quantity++;
    } else {
      // If product is not in the cart, add it with quantity 1
      cart.value.push({
        product: product,
        quantity: 1
      });
    }

    buttonAnimation.value.add(product.id); // Add product ID to the set

    setTimeout(() => {
      buttonAnimation.value.delete(product.id); // Remove it after animation is done
    }, 3000); // Assuming animation duration is 2 seconds
    
    showFlashNotification.value = true;
    setTimeout(() => {
      showFlashNotification.value = false;
    }, 1000); // Hide after 1 second
  };

  const removeFromCart = (product: Product) => {
    const index = cart.value.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      cart.value.splice(index, 1);
    }
  };
  
  const cartLength = computed(() => {
    return cart.value.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    cartLength,
    buttonAnimation // Export this ref
  };
}
