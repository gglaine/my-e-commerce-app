<template>
    <div>
      <h1>Checkout Page</h1>
      <div v-if="product">
        <h2>{{ product.label }}</h2>
        <p>{{ product.description }}</p>
        <p>{{ product.price / 100 }} €</p>
        <img :src="product.thumbnail_url" alt="Product thumbnail" v-if="product.thumbnail_url" />
        <!-- Add checkout form or other details here -->
      </div>
      <div v-else>
        <p>Product not found</p>
      </div>
    </div>

  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { products } from './data';
  
  export default defineComponent({
    props: {
      id: String,
    },
    setup(props) {
      const product = computed(() => products.find(p => p.id === props.id));
  
      return {
        product,
      };
    },
  });
  </script>
  