<template>
  <nav class="relative z-60 p-6 pb-2 pt-2 flex justify-between items-center">
    <router-link to="/">
      <img src="airshop.svg" alt="Logo" class="h-16 w-32 mr-2" />
    </router-link>
    <div >
      <button @click="toggleDropdown" class="bg-gray-200 mr-2 text-black p-2 rounded">
        {{ currentFlag }} ▼
      </button>
      <button @click="goToCart" class="bg-green-500 text-white p-2 rounded">
        <font-awesome-icon icon="cart-shopping" class="mr-2" />{{ cartLength }}
      </button>
      <div  v-if="showDropdown" class="absolute right-0 mt-4 w-48 rounded-md shadow-lg bg-white-200">
        <div class="py-1">
          <button @click="setLanguage('en')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">🇬🇧 {{ t('English') }}</button>
          <button @click="setLanguage('fr')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">🇫🇷 {{ t('Francais') }}</button>
        </div>
      </div>
    </div>
  </nav>
</template>



<script lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const { cartLength } = useCart();
    const { t, locale } = useI18n();

    const showDropdown = ref(false);

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const goToCart = () => {
      router.push('/checkout');
    };

    const setLanguage = (language: string) => {
      locale.value = language;
      console.log("Current locale:", locale.value); 
    };

    const currentFlag = computed(() => {
      switch (locale.value) {
        case 'en':
          return '🇬🇧';
        case 'fr':
          return '🇫🇷';
        // Add more cases as needed
        default:
          return '';
      }
    });

    return {
      goToCart,
      cartLength,
      setLanguage,
      t,
      showDropdown,
      toggleDropdown,
      currentFlag
    };
  }
}
</script>

