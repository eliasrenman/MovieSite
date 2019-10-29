import Vue from 'vue';
import navbar from './components/navbar/navbar.vue';
import tiles from './components/featured/tiles.vue';
import details from './components/details/details.vue';
import search from './components/search/search.vue';


Vue.config.productionTip = false;
/** navbar components */
Vue.component('vue-nav', navbar);
Vue.component('vue-tiles', tiles);
Vue.component('vue-details', details);
Vue.component('vue-search', search);

/**Feaured tiles components */

// url for getting images.
// https://image.tmdb.org/t/p/w500/imgId

new Vue({
    el: '#app',
})