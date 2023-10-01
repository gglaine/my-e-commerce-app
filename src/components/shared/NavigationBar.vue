<template>
  <nav class="sticky top-0 mb-12 z-1000 pl-8 pr-8 pb-2 bg-orange-500 pt-2 flex justify-between items-center border-b border-orange-500">
    <!-- Logo -->
    <router-link to="/">
      <img src="/HAPPYCART.svg" alt="Logo" class="h-16 w-32 mr-2" />
    </router-link>
    <!-- Desktop View Links -->
    <div class="hidden md:flex space-x-4">
      <router-link to="/contact" class="text-white font-bold hover:bg-orange-600 px-2 py-1 rounded">Contact</router-link>
      <router-link to="/about" class="text-white font-bold hover:bg-orange-600 px-2 py-1 rounded">About</router-link>
      <router-link to="/services" class="text-white font-bold hover:bg-orange-600 px-2 py-1 rounded">Services</router-link>
    </div>

    <!-- Icons and Dropdown -->
    <div ref="dropdownWrapper" class="flex items-center">
      <button @click="toggleDropdown" class="bg-gray-200 mr-2 text-black p-2 rounded">
        {{ currentFlag }} ▼
      </button>
      <button @click="goToCart" class="bg-amber-500 text-white p-2 rounded">
        <font-awesome-icon icon="cart-shopping" class="mr-2" />{{ cartLength }}
      </button>
      <div v-if="showDropdown" ref="dropdown" class="absolute right-24 top-7 mt-8 w-48 rounded-md shadow-lg bg-orange-500 z-3000">
        <div class="py-1">
          <button @click="setLanguage('en')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">🇬🇧 {{ t('English') }}</button>
          <button @click="setLanguage('fr')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">🇫🇷 {{ t('Francais') }}</button>
        </div>
      </div>
    </div>
       <!-- Mobile View with Hamburger Button -->
       <div class="md:hidden">
      <button @click="showMobileMenu = !showMobileMenu">
        <!-- Replace with your hamburger icon or style it with CSS -->
        <div class="font-bold text-white text-4xl">☰</div>
      </button>
      <div v-if="showMobileMenu" class="absolute top-full left-0 w-full bg-orange-400 mt-0 pt-12 pb-8 text-right pr-4 rounded topstack">
        <router-link to="/contact" class="block py-2 px-4 text-white font-bold hover:bg-orange-600">Contact</router-link>
        <router-link to="/about" class="block py-2 px-4 text-white font-bold hover:bg-orange-600">About</router-link>
        <router-link to="/services" class="block py-2 px-4 text-white font-bold hover:bg-orange-600">Services</router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const { cartLength } = useCart();
    const { t, locale } = useI18n();
    const dropdownRef = ref<HTMLElement | null>(null);
    const dropdownWrapper = ref<HTMLElement | null>(null);
    const showDropdown = ref(false);
    const showMobileMenu = ref(false); // added for mobile menu visibility

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
        default:
          return '';
      }
    });

    const toggleMobileMenu = () => { // added to toggle mobile menu visibility
      showMobileMenu.value = !showMobileMenu.value;
    };

    const handleClickOutside = (event: Event) => {
      if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target as Node)) {
        showDropdown.value = false;
      }
    };

    watch(showDropdown, (isDropdownShown) => {
      if (isDropdownShown) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return {
      goToCart,
      cartLength,
      setLanguage,
      t,
      showDropdown,
      toggleDropdown,
      currentFlag,
      dropdownRef,
      dropdownWrapper,
      showMobileMenu,     // expose the mobile menu visibility ref
      toggleMobileMenu    // expose the function to toggle mobile menu visibility
    };
  }
}
</script>

<style>

.topstack {
  z-index: 2000 !important;
}
.navbar-animated {  
  z-index: 1000 !important;
  transform: rotateX('45');
  /* Previously defined custom properties */
  --s: 100px;
  --c1: #cbcbcb87;
  --c2: rgba(255, 165, 31, 0.8); /* Changed to blue */
  --_s: calc(2*var(--s)) calc(2*var(--s));
  --_g: var(--_s) conic-gradient(at 40% 40%,#0000 5%,var(--c1) 0);
  --_p: var(--_s) conic-gradient(at 20% 20%,#0000 85%,var(--c2) 0);
  /* Background properties */
  background:
    calc( .9*var(--s)) calc( .9*var(--s))/var(--_p),
    calc(-.1*var(--s)) calc(-.1*var(--s))/var(--_p),
    calc( .7*var(--s)) calc( .7*var(--s))/var(--_g),
    calc(-.3*var(--s)) calc(-.3*var(--s))/var(--_g),
    conic-gradient(from 90deg at 20% 20%,var(--c2) 5%,var(--c1) 0) 0 0/var(--s) var(--s);
  /* Animation */
  animation: m 13s infinite;
}
.text{
  font-family:'Roboto', sans-serif;
  text-align:center;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  color:#ccc;
}

</style>

