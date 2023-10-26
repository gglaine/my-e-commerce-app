<template>
  <div class="w-full flex sticky top-12 z-0 justify-center items-center mt-6 pt-2">
    <div class="max-w-2xl bg-white p-6  mt-4 rounded-lg shadow-lg">

      <h1 class="text-2xl font-bold mb-8">{{ $t('about.title') }}</h1>
      
      <h2 class="text-xl font-bold mb-4">{{ $t('about.welcomeIntro') }}</h2>
      <p class="mb-4">{{ $t('about.welcomeDescription') }}</p>

      <ul class="list-disc pl-5 mb-6">
        <li v-for="index in 5" :key="index">
            {{ $t(`about.techList[${index - 1}]`) }}
        </li>
    </ul>
    
      <h2 class="text-xl mb-4">{{ $t('about.speakYourLanguageTitle') }}</h2>
      <p class="mb-4">{{ $t('about.speakYourLanguageDescription') }}</p>

      <h3 class="text-lg mb-4">🔥 Features</h3>
      <ul class="list-disc pl-5 mb-6">
        <li v-for="index in 5" :key="index">
            {{ $t(`about.featuresList[${index - 1}]`) }}
        </li>
    </ul>

      <h3 class="text-lg mb-4">🛠️ Getting Started with Airshop</h3>
      <ul class="list-disc pl-5 mb-6">
        <li v-for="index in 4" :key="index">
            {{ $t(`about.gettingStartedSteps[${index - 1}]`) }}
        </li>
    </ul>
      <h2 class="text-xl mb-4">{{ $t('about.joinUsTitle') }}</h2>
      <p class="mb-4">{{ $t('about.joinUsDescription') }}</p>

      <p class="mb-4">{{ $t('about.license') }}</p>
      <p class="mb-4">{{ $t('about.shoutout') }}</p>
      <p class="mb-6">{{ $t('about.finalNote') }}</p>

      <h2 class="text-xl mb-4">{{ $t('about.forTechTitle') }}</h2>
      <p class="mb-4">{{ $t('about.forTechDescription') }}</p>



      <p class="mb-4">{{ $t('about.typeScriptSupport') }}</p>
      <p class="mb-6" v-html="$t('about.performanceOptimization')"></p>
      
    </div>
  </div>
</template>

  

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const pageName = ref('About Us');    
    return {
      t,
      pageName,
    };
  },
});
</script>
