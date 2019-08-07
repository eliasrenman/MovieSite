import Vue from 'vue';
import App from './components/App.vue';
import navbar from './components/navbar.vue';
import search from './components/search.vue';

Vue.config.productionTip = false;

Vue.component('navbar', navbar);
Vue.component('search', search);
new Vue({
    // render: (h) => h(App),
}).$mount('#app');
