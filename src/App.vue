<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 2em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.product-card {
  border: 1px solid #ccc;
  padding: 1em;
  margin: 1em;
  display: inline-block;
}
</style>
