import { createRouter, createWebHistory } from 'vue-router';
import ProductCatalogue from './components/ProductCatalogue.vue';
import CheckoutPage from './components/CheckoutPage.vue';

const routes = [
  { path: '/', component: ProductCatalogue },
  { path: '/products', component: ProductCatalogue },
  { path: '/checkout/:id', component: CheckoutPage, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
