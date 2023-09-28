<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">{{ pageName }}</h1>
        <p>I made this template so you can jumpstart your next portfolio or SASS.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const pageName = ref('About Us');
  </script>
  