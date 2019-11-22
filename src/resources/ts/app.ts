import Vue from 'vue';
import navbar from './components/navbar/navbar.vue';
import tiles from './components/featured/tilesPage.vue';
import details from './components/details/detailsPage.vue';
import search from './components/search/searchPage.vue';
import toplist from './components/toplist/toplistPage.vue';
import scroll_top from './components/navbar/scroll-top.vue';

//@ts-ignore
import infiniteScroll from 'vue-infinite-scroll';

Vue.config.productionTip = false;
/** navbar components */
Vue.component('vue-nav', navbar);
Vue.component('vue-tiles', tiles);
Vue.component('vue-details', details);
Vue.component('vue-search', search);
Vue.component('vue-toplist', toplist);
Vue.component('vue-top', scroll_top);

Vue.use(infiniteScroll);

new Vue({
    el: '#app',
})