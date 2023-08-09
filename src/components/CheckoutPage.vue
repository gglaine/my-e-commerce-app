<template>
  <div class="bg-gray-100 top-24 p-4 flex flex-col md:flex-row mt-8 max-w-screen-xl mx-auto">
    
    <!-- Cart with checkout button and total -->
    <div class="p-8 m-4 border rounded shadow-lg bg-white mb-4 md:mb-0">
      <h2 class="text-xl mb-4">{{$t('yourCart')}}</h2> 
      <div v-for="product in cart" :key="product.id" class="mb-2 flex justify-between items-center">
        <div>
          <span>{{ product.label }}:</span>
          <span>{{ product.price / 100 }} €</span>
        </div>
        <button @click="removeFromCart(product)" class="bg-red-500 text-white ml-8 text-xs p-2 rounded">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
      </div>
      <div class="font-bold text-lg">
        Total: {{ total }} €
      </div>
      <!-- Checkout button -->
      <button class="bg-green-500 text-white p-2 rounded mt-4 mb-4">{{$t('proceedToCheckout')}}</button>
    </div>

    <!-- Product Cards -->
    <!-- <div class="flex flex-col items-end">
      <div v-for="product in cart" :key="product.id" class="relative w-full md:w-1/2 p-2 m-4 border rounded shadow-lg bg-white">
          <h2 class="text-xl mb-2">{{ product.label }}</h2>
          <p class="mb-2">{{ product.description }}</p>
          <div class="absolute top-0 right-0 bg-white p-2 rounded-bl text-sm font-bold">
            {{ product.price / 100 }} €
          </div>
      </div>
    </div> -->

  </div>
</template>


<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCart } from './composables/useCart';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { cart, removeFromCart } = useCart();
    const { t } = useI18n();
    
    const total = computed(() => {
      return cart.value.reduce((sum, product) => sum + product.price / 100, 0);
    });

    return {
      cart,
      total,
      removeFromCart,
      t
    };
  },
});
</script>
