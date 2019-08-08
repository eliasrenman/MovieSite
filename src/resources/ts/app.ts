import Vue from 'vue';
import navbar from './components/navbar/navbar.vue';
import tiles from './components/featured/tiles.vue';

Vue.config.productionTip = false;
/** navbar components */
Vue.component('navbar', navbar);
Vue.component('vue-tiles', tiles);

/**Feaured tiles components */

// url for getting images.
// https://image.tmdb.org/t/p/w500/imgId

new Vue({})
    .$mount('#vue-nav');


new Vue({})
    .$mount('#vue-tiles');
