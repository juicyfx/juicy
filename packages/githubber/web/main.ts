import Vue from 'vue';
import App from './ui/App.vue';
import VueRouter from 'vue-router';
import ReleasePage from "./ui/pages/ReleasePage.vue";
import ReadmePage from "./ui/pages/ReadmePage.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/release' },
    { path: '/release', component: ReleasePage },
    { path: '/readme', component: ReadmePage }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
