<template>
  <div class="bg-gray-100 p-4 flex">
    <div class="flex-1">
      <h1 class="text-2xl font-bold mb-4">Checkout Page</h1>
      <div v-for="product in cart" :key="product.id" class="relative p-4 m-4 border rounded shadow-lg bg-white w-96 h-44">
        <h2 class="text-xl mb-2">{{ product.label }}</h2>
        <p class="mb-2">{{ product.description }}</p>
        <div class="absolute top-0 right-0 bg-white p-2 rounded-bl text-sm font-bold">
          {{ product.price / 100 }} €
        </div>
      </div>
    </div>
    <div class="p-4 m-4 border rounded shadow-lg bg-white w-64">
      <h2 class="text-xl mb-4">Your Cart</h2>
      <div v-for="product in cart" :key="product.id" class="mb-2">
        <span>{{ product.label }}:</span>
        <span>{{ product.price / 100 }} €</span>
        <button @click="removeFromCart(product)" class="bg-red-500 text-white p-2 rounded">Remove</button>
      </div>
      <div class="font-bold text-lg">
        Total: {{ total }} €
      </div>
      <!-- Add checkout button or other details here -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCart } from './composables/useCart';

export default defineComponent({
  setup() {
    const { cart, removeFromCart } = useCart();
    
    const total = computed(() => {
      return cart.value.reduce((sum, product) => sum + product.price / 100, 0);
    });

    return {
      cart,
      total,
      removeFromCart
    };
  },
});
</script>
