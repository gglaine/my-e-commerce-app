<template>
  <div class="max-w-screen-xl mx-auto relative z-1000">
    <!-- Sticky container for navbar and product list -->
    <div class="sticky top-48 z-50 overflow-hidden">
      <!-- Navbar section -->
      <div class="p-6 flex flex-col h-28 md:flex-row justify-between mb-2 z-0 navbar-animated  rounded">
        <!-- Categories Selection -->
        <div class="hidden md:flex flex-row justify-end mt-2 mb-4 space-x-2 pr-4 text-orange font-bold font-Inter">
          <button @click="selectedCategory = ''" class="p-2 rounded hover:bg-orange-500" :class="{ 'bg-emerald-500': selectedCategory === '' }">
            {{$t('allCategories')}}
          </button>
          <button 
            v-for="category in categories" 
            :key="category.id" 
            @click="selectedCategory = category.id" 
            class="p-2 border rounded hover:bg-orange-400 mh-12  " 
            :class="{ 'bg-gray-300': selectedCategory === category.id }">
              {{ $t(`categories.${category.id}`) }}
          </button>
        </div>
        <!-- Search Input -->
        <input v-model="searchTerm" :placeholder="$t('searchProducts')" class="w-full pl-4 rounded border max-h-12" />
      </div>
      <!-- Products list section with overflow handling -->
      <div class="bg-gray-100 border rounded mt-8 pt-8 p-8 pb-12 flex flex-col md:flex-row-reverse overflow-y-auto max-h-[calc(100vh-200px)]">
        <div class="flex z-0 flex-col md:flex-row md:flex-wrap space-y-2 justify-end items-end p-2">
          <div v-for="product in filteredProducts" :key="product.id" class="border rounded shadow-md hover:shadow-lg bg-white p-8 m-2 text-sm mr-2 md:w-1/3 transform transition hover:scale-102 hover:bg-slate-50">
            <!-- Product Thumbnail -->
            <div class="mb-2 max-w-screen-sm relative p-2 pl-0">
                <div :style="{ backgroundImage: `url(${product.thumbnail_url})`, backgroundSize: 'cover', backgroundPosition: 'center center', top: '0em', right: '0em', backgroundRepeat: 'no-repeat', aspectRatio: '16/9', width: '90px', borderRadius: '6px' }" class=" md:absolute md:top-2 md:-right-2 display: inline-block"></div>
                <h2 class="text-md font-bold mb-1 -pl-2 mt-4 md:mt-0 font-Inter ">{{ product.label }}</h2>
            </div>
              <!-- Product Description -->
              <div class="flex mb-8 mt-8">
                  <p class="max-w-sm text-md pr-2 md:pt-3 pt-1">{{ product.description }}</p>
              </div>
              <!-- Product Price & Add To Cart -->
              <div class="flex justify-between items-end">
              <h2 class="text-lg mr-8 text-left pt-0 pb-1 font-bold">
                <font-awesome-icon icon="fa-solid fa-tag" class="hidden md:visible" />{{ product.price / 100 }} €
              </h2>
              <button 
                :class="{ 'clicked': buttonAnimation.has(product.id) }" 
                class="cart-button" 
                @click="addToCart(product)">
                <span v-if="!buttonAnimation.has(product.id)" class="add-to-cart">{{ t('addToCart') }}</span>
                <span v-else class="added">Item added</span>
                <font-awesome-icon icon="fa-solid fa-cart-arrow-down" class="cart-icon text-2xl" />
                <font-awesome-icon 
                  v-if="buttonAnimation.has(product.id)" 
                  icon="fa-solid fa-box" 
                  class="box-icon text-4xl font-4xl text-emerald-500" />
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
    const router = useRouter();
    const { cart, addToCart, cartLength, buttonAnimation } = useCart();
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
      buttonAnimation
    };
  },
});
</script>

<style>
.cart-button {
  position: relative;
  outline: 0;
  background-color: rgb(221, 115, 9);
  color: #fff;
  border: none;
  height: 48px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  line-height: 0px;
  overflow: hidden;
  cursor: pointer;

}
.cart-button font-awesome-icon[icon="fa-solid fa-cart-arrow-down"] {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: -50%;  /* Adjust this to initially place it outside the button */
  font-size: 1.8em;
  transform: translate(-50%, -50%);

}

.cart-button:focus {
  outline: none !important;
}

.cart-button span {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
}

.cart-button .cart-icon {
  position: absolute;
  top: 50%;
  left: -50%;  /* Adjust this to initially place it outside the button */
  transform: translate(-50%, -50%);
  transition: left 1.2s ease-in;
}

.cart-button.clicked .cart-icon {
  left: 150%;
  transform: rotate(30deg);
}

</style>