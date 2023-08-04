import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import { messages } from './translations';
import './style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret, faCartArrowDown, faCartShopping } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret, faCartArrowDown, faCartShopping);

const i18n = createI18n({
  locale: 'en', // Set the initial locale to English
  messages,
});

createApp(App)
  .use(i18n)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app');
