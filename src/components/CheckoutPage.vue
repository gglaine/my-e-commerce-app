<template>
    <div class="bg-gray-100 p-4">
      <h1 class="text-2xl font-bold mb-4">Checkout Page</h1>
      <div v-for="product in cart" :key="product.id" class="p-4 m-4 border rounded shadow-lg bg-white w-96 h-44">
        <h2 class="text-xl mb-2">{{ product.label }}</h2>
        <p class="mb-2">{{ product.description }}</p>
        <p class="mb-2">{{ product.price / 100 }} €</p>
        <img :src="product.thumbnail_url" alt="Product thumbnail" v-if="product.thumbnail_url" class="mb-2" />
      </div>
      <!-- Add checkout form or other details here -->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Product } from './types'; // Import the Product type from your types file
  
  export default defineComponent({
    setup() {
      // Assuming cart is managed at a higher level, like a Vuex store or a parent component
      const cart = ref<Product[]>([]); // Define the cart as an array of Product
  
      return {
        cart,
      };
    },
  });
  </script>

  
  
  
  
  