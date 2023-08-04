<template>
  <nav class="bg-slate-200 p-4 flex justify-between items-center">
    <router-link to="/">
      <img src="airshop.svg" alt="Logo" class="h-16 w-32 mr-2" />
    </router-link>
    <button @click="setLanguage('en')">{{ t('english') }}</button>
    <button @click="setLanguage('fr')">{{ t('french') }}</button>
    <button @click="goToCart" class="bg-green-500 text-white p-2 rounded">
      <font-awesome-icon icon="cart-shopping" class="mr-2" />{{ cartLength }}
    </button>
  </nav>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useCart } from '../composables/useCart';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const { cartLength } = useCart();
    const { t, locale } = useI18n();

    const goToCart = () => {
      router.push('/checkout');
    };

    const setLanguage = (language: string) => {
      locale.value = language;
      console.log("Current locale:", locale.value); 
    };

    return {
      goToCart,
      cartLength,
      setLanguage,
      t
    };
  }
}
</script>
