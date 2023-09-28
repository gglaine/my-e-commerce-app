<template>
  <div id="app">
    <NavigationBar class="fixed top-0" />
    <router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
    <FooterBar/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './components/shared/NavigationBar.vue'; // Adjust the path to match your file structure
import FooterBar from './components/shared/FooterBar.vue';

export default defineComponent({
  components: {
    NavigationBar,FooterBar
  },
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 330ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
