import Vue from 'vue';
import App from './ui/App.vue';
import VueRouter from 'vue-router';
import DefaultPage from "./ui/pages/DefaultPage.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: DefaultPage },
    { path: '/_/embed', component: DefaultPage }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
