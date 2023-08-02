<template>
  <div >
   
      <h1 class="text-2xl font-bold mb-4">Product Catalogue</h1>
    <div class="bg-gray-100 p-4 flex flex-row">
      <div class="flex flex-col space-y-4">
        <div v-for="product in products" :key="product.id" class="p-4 m-4 border rounded shadow-lg bg-white w-full max-w-sm h-44">
          <h2 class="text-xl mb-2">{{ product.label }}</h2>
          <p class="mb-2">{{ product.description }}</p>
          <p class="mb-2">{{ product.price / 100 }} €</p>
          <img :src="product.thumbnail_url" alt="Product thumbnail" v-if="product.thumbnail_url" class="mb-2" />
          <button @click="addToCart(product)" class="bg-blue-500 text-white p-2 rounded">Add to Cart</button>
        </div>
      </div>
      <div class="flex flex-col p-4 m-4 border rounded shadow-lg bg-white w-40 flex-none">
      <button className="bg-green-500 text-white p-2 rounded mb-4">Proceed to Checkout</button>
      <!-- You can add more content to the sidebar if needed -->
    </div>
    </div>

  

  </div>
</template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useCart } from './composables/useCart';
  import { products } from './data'; // Make sure the path is correct
  import { useRouter } from 'vue-router';
//   import { Product } from './types';
  
  export default defineComponent({
    setup() {
      const { addToCart } = useCart();
  
      return {
        products,
        addToCart,
      };
    },
  });
  </script>
  