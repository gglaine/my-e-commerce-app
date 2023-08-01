<!-- ProductCatalogue.vue -->
<template>
    <div>
      <h1>Product Catalogue</h1>
      <div v-for="product in products" :key="product.id" class="product-card">
        <h2>{{ product.label }}</h2>
        <p>{{ product.description }}</p>
        <p>{{ product.price / 100 }} €</p>
        <img :src="product.thumbnail_url" alt="Product thumbnail" v-if="product.thumbnail_url" />
        <router-link :to="`/checkout/${product.id}`">Checkout this product</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { products } from './data'; // Make sure the path is correct
  
  export default defineComponent({
    setup() {
      return {
        products,
      };
    },
  });
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ccc;
    padding: 1em;
    margin: 1em;
    display: inline-block;
  }
  </style>
  