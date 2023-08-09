<template>

  <div class="max-w-screen-xl mx-auto mt-12 p-2">
    <div class="p-4 flex justify-end mb-8">
      <input v-model="searchTerm" :placeholder="$t('searchProducts')" class="w-full p-2 mr-2 rounded border" />
      <select v-model="selectedCategory" class="p-2 mr-0 rounded border">
        <option value="">{{$t('allCategories')}}</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.label }}</option>
      </select>
    </div>

    <div class="bg-gray-100 p-4 flex flex-col w-24 min-w-full md:flex-row-reverse">
      
      <div class="flex flex-col p-8 m-4 border rounded shadow-lg bg-white max-w-lg md:w-1/4 flex-none mb-4 md-w-full md:mb-0">
        <div v-if="showFlashNotification" class="fixed notification top-4 right-4 bg-green-500 text-white p-4 rounded transition duration-300 ease-in-out" :class="{ 'animate-notification': showFlashNotification }">
          {{$t('onTheMove')}}
        </div>
        <h3 class="mb-2"> {{$t('itemsInYourCart')}}</h3>
        <div v-for="product in cart" :key="product.id" class="mb-3 flex justify-between text-sm">
          <span>{{ product.label }}:</span>
        </div>
        <button @click="proceedToCheckout" class="bg-green-500 text-white p-2 rounded mb-4">{{$t('proceedToCheckout')}}</button>
      </div>

      <div class="flex flex-col md:flex-col space-y-4 justify-end items-end p-1">

        <div v-for="product in filteredProducts" :key="product.id" class="border rounded shadow-lg bg-white  
        p-8 m-2 relative text-sm mr-2">

          <div class="mb-2 w-full max-w-screen-2xl relative p-4">
            <div :style="{ backgroundImage: `url(${product.thumbnail_url})`, backgroundSize: 'cover', backgroundPosition: 'center center', top: '0em', right: '-3em', backgroundRepeat: 'no-repeat', aspectRatio: '16/9', width: '90px', borderRadius: '6px' }" class=" md:absolute md:top-2 md:-right-4 display: inline-block" >
            </div>
            <h2 class="text-xl mb-1 pl-0 mt-4 md:mt-0 ">{{ product.label }}</h2>
          </div>
          <div class="flex mb-8 ">
            <p class="max-w-sm text-lg pr-2 md:pt-3 pt-1">{{ product.description }}</p>
          </div>
          <div class="flex justify-end items-end">
            <h2 class="text-lg mr-8 pt-0 pb-1"><font-awesome-icon icon="fa-solid fa-tag" class="hidden md:visible" />{{ product.price / 100 }} €</h2>

            <button @click="addToCart(product)" class="mt-0 pt-2 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition duration-300 ease-in-out text-sm">
              <font-awesome-icon icon="fa-solid fa-cart-arrow-down" class="mr-2" />
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>





<script lang="ts">
import axios from 'axios';
import { useI18n } from 'vue-i18n'
import { defineComponent, ref, computed } from 'vue';
import { useCart } from './composables/useCart';
import { useRouter } from 'vue-router';
import { Product, Category } from './types';

export default defineComponent({
  setup() {
    const router = useRouter();
    const { cart, addToCart, cartLength } = useCart();
    const { t } = useI18n();
    const products = ref<Product[]>([]);
    const categories = ref<Category[]>([]);
    const searchTerm = ref<string>('');
    const selectedCategory = ref<string>('');
    const showFlashNotification = ref(false);

    // Fetch products from the API
    axios.get('https://test-feed.airweb.workers.dev/products')
      .then(response => {
        products.value = response.data;
      })
      .catch(error => {
        console.error('An error occurred while fetching the products:', error);
      });

    // Fetch categories from the API
    axios.get('https://test-feed.airweb.workers.dev/categories')
      .then(response => {
        categories.value = response.data;
      })
      .catch(error => {
        console.error('An error occurred while fetching the categories:', error);
      });

    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        return (!searchTerm.value || product.label.toLowerCase().includes(searchTerm.value.toLowerCase())) &&
               (!selectedCategory.value || product.category_id === selectedCategory.value);
      });
    });

    const proceedToCheckout = () => {
      router.push('/checkout');
    };

    return {
      cart,
      filteredProducts,
      categories,
      cartLength,
      searchTerm,
      selectedCategory,
      addToCart, // Use the modified function
      proceedToCheckout,
      showFlashNotification,
      t,
    };
  },
});
</script>

<style>
.movearea {
  transition: 0.3s background-color ease;
}
.notification {
  position: fixed;
  top: 4rem;
  right: 4rem;
  background-color: #48bb78; /* bg-green-500 */
  color: white;
  padding: 1rem;
  border-radius: 0.25rem; /* rounded */
  transition: transform 1s ease-in-out; /* 1s duration */
  transform: translateX(0); /* initial position */
}

.animate-notification {
  transform: translateX(-300px); /* target position */
}
</style>