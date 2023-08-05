<template>
  <div class="max-w-screen-xl mx-auto mt-32">
    <div class="p-4 flex justify-end">
      <input v-model="searchTerm" :placeholder="$t('searchProducts')" class="w-full p-2 mr-2 rounded border" />
      <select v-model="selectedCategory" class="p-2 mr-0 rounded border">
        <option value="">{{$t('allCategories')}}</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.label }}</option>
      </select>
    </div>
    <div class="bg-gray-100 p-4 flex flex-col md:flex-row-reverse">
      <div class="flex flex-col p-1 m-4 border rounded shadow-lg bg-white w-full md:w-40 flex-none mb-4 md:mb-0">
        <div v-if="showFlashNotification" class="fixed notification top-4 right-4 bg-green-500 text-white p-4 rounded transition duration-300 ease-in-out" :class="{ 'animate-notification': showFlashNotification }">
          {{$t('onTheMove')}}
        </div>
        <button @click="proceedToCheckout" class="bg-green-500 text-white p-2 rounded mb-4">{{$t('proceedToCheckout')}}</button>
        <!-- You can add more content to the sidebar if needed -->
        <h3 class="mb-2"> {{$t('itemsInYourCart')}}</h3>
        <div v-for="product in cart" :key="product.id" class="mb-2 flex justify-between text-sm">
  <span>{{ product.label }}:</span>
  <!-- <span>{{ product.price / 100 }} €</span> -->
</div>
      </div>
      <div class="flex flex-col space-y-2">
        <div v-for="product in filteredProducts" :key="product.id" class="border rounded shadow-lg bg-white w-full flex flex-row">
          <div :style="{ backgroundImage: `url(${product.thumbnail_url})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '16 / 9' }" class="w-1/2"></div>
          <div class="p-4 w-1/2 flex flex-col justify-between">
            <div>
              <h2 class="text-xl mb-2">{{ product.label }}</h2>
              <p class="mb-2">{{ product.description }}</p>
              <p class="mb-2">{{ product.price / 100 }} €</p>
            </div>
            <div class="text-right mt-2">
              <button @click="addToCart(product)" class="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded transition duration-300 ease-in-out">
                <font-awesome-icon icon="fa-solid fa-cart-arrow-down" class="mr-2" />{{$t('addToCart')}}
              </button>
            </div>
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

    const router = useRouter();
    const { cart, addToCart, cartLength } = useCart();
    const { t } = useI18n();
  


    const addToCartWithNotification = (product: Product) => {
      addToCart(product); // Call the original addToCart from useCart
      showFlashNotification.value = true;
      setTimeout(() => {
        showFlashNotification.value = false;
      }, 1000); // Hide after 1 second
    };

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
      addToCart: addToCartWithNotification, // Use the modified function
      proceedToCheckout,
      showFlashNotification,
      t
    };
  },
});
</script>

<style>
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