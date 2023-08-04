<template>
  <div id="app">
    <NavigationBar />
    <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './components/shared/NavigationBar.vue'; // Adjust the path to match your file structure

export default defineComponent({
  components: {
    NavigationBar,
  },
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 5.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
