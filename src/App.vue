<template>
  <div id="app" class="flex flex-col min-h-screen">
    <NavigationBar class="fixed top-0  w-full" />
    <div class="flex-grow pt-4 md:pt-16 pb-16 overflow-auto"> <!-- adjust padding as needed -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <FooterBar class="w-full"/>
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
