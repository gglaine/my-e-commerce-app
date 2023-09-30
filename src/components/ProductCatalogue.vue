<template>
  <div class="max-w-screen-xl mx-auto relative z-1000">
    <!-- Sticky container for navbar and product list -->
    <div class="sticky top-48 z-50 overflow-hidden">
      <!-- Navbar section -->
      <div class="p-2 md:p-6 flex flex-col h-32 md:h-28 md:flex-row justify-between mb-2 z-0 navbar-animated  rounded">
<!-- Categories Selection -->
<div class="flex flex-row justify-end mt-2 mb-4 space-x-2 pr-4 text-orange font-bold font-Inter">
  <button @click="selectedCategory = ''" class="p-1 md:p-2 text-sm md:text-base rounded hover:bg-orange-500" :class="{ 'bg-emerald-500': selectedCategory === '' }">
    {{$t('allCategories')}}
  </button>
  <button 
    v-for="category in categories" 
    :key="category.id" 
    @click="selectedCategory = category.id" 
    class="p-1 md:p-2 text-sm md:text-base border rounded hover:bg-orange-400" 
    :class="{ 'bg-gray-300': selectedCategory === category.id }">
        {{ $t(`categories.${category.id}`) }}
  </button>
</div>

        <!-- Search Input -->
<input v-model="searchTerm" :placeholder="$t('searchProducts')" class="w-full pl-4 py-3 md:py-2 rounded border h-auto md:max-h-12" />

      </div>
      <!-- Products list section with overflow handling -->
      <div class="bg-gray-100 border rounded mt-8 pt-8 p-8 pb-12 flex flex-col md:flex-row-reverse overflow-y-auto max-h-[calc(100vh-200px)]">
        <div class="flex z-0 flex-col md:flex-row md:flex-wrap space-y-2 justify-end items-end p-2">
          <div v-for="product in filteredProducts" :key="product.id" class="border rounded shadow-md hover:shadow-lg bg-white p-8 m-2 text-sm mr-2 md:w-1/3 transform transition hover:scale-102 hover:bg-slate-50">
            <!-- Product Thumbnail -->
            <div class="mb-2 max-w-screen-sm relative p-2 pl-0">
                <div :style="{ backgroundImage: `url(${product.thumbnail_url})`, backgroundSize: 'cover', backgroundPosition: 'center center', top: '0em', right: '0em', backgroundRepeat: 'no-repeat', aspectRatio: '16/9', width: '90px', borderRadius: '6px' }" class=" md:absolute md:top-2 md:-right-2 display: inline-block"></div>
                <h2 class="text-lg md:max-w-[50%] font-bold whitespace-normal mb-1 -pl-2 mt-4 md:mt-0 font-Inter ">{{ $t(`products.${product.id}.label`) }}</h2>
              </div>
              <!-- Product Description -->
              <div class="flex mb-8 mt-8">
                <p class="max-w-sm text-md pr-2 md:pt-3 pt-1">{{ $t(`products.${product.id}.description`) }}</p>
            </div>
              <!-- Product Price & Add To Cart -->
              <div class="flex justify-between items-end">
              <h2 class="text-lg mr-8 text-left pt-0 pb-1 font-bold">
                <font-awesome-icon icon="fa-solid fa-tag" class="hidden md:visible" />{{ product.price / 100 }} €
              </h2>
              <button 
                :class="{'cart-button': true, 'clicked': buttonAnimation.has(product.id)}" 
                @click="addToCart(product)"
                class="bg-orange-400">
                <span class="add-to-cart"><font-awesome-icon icon="fa-brands fa-opencart"  class="cart-icon text-xl"  /></span>
                <span class="added">Added</span>
                <!-- <font-awesome-icon icon="fa-solid fa-cart-arrow-down" class="cart-icon text-xl" /> -->
                <font-awesome-icon icon="fa-brands fa-opencart"  class="cart-icon text-xl"  />
                    <font-awesome-icon 
                        v-if="buttonAnimation.has(product.id)" 
                        icon="fa-solid fa-box" 
                        class="cart-item text-4xl font-4xl text-emerald-500" />
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
  padding: 2em;
  width: 120px;
  height: 40px;
  border: 0;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  transition: 0.3s ease-in-out;
  overflow: hidden;
}

.cart-button span {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  color: #fff;
}

.cart-button span.add-to-cart {
  opacity: 1;
}

.cart-button span.added {
  opacity: 0;
}

.cart-button .cart-icon,
.cart-button .cart-item {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cart-button .cart-icon {
  left: -10%;
  font-size: 2em;
}

.cart-button .cart-item {
  left: 52%;
  top: -20%;
  font-size: 1.2em;
}

.cart-button.clicked .cart-icon {
  animation: cart 1.5s ease-in-out forwards;
}

.cart-button.clicked .cart-item {
  animation: box 1.5s ease-in-out forwards;
}

.cart-button.clicked span.add-to-cart {
  animation: add 1.5s ease-in-out forwards;
}

.cart-button.clicked span.added {
  animation: added 1.5s ease-in-out forwards;
}

@keyframes cart {
  0% {
    left: -80%;
  }
  40%, 60% {
    left: 50%;
  }
  100% {
    left: 110%;
  }
}

@keyframes box {
  0%, 40% {
    top: -20%;
  }
  60% {
    top: 40%;
    left: 52%;
  }
  100% {
    top: 40%;
    left: 112%;
  }
}

@keyframes add {
  0% {
    opacity: 1;
  }
  20%, 100% {
    opacity: 0;
  }
}

@keyframes added {
  0%, 80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>
