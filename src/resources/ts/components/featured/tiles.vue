<template>
    <div>
        <!-- <div class="grid">
            <tile v-for="result in this.data.results" :key="result.id" :data="result"></tile>
            <div v-for="result in this.data.results" :key="result.id" class="grid-item" :class="{'grid-item--width2' : result.tileSizeBig}">
            </div>
            
        </div> -->
        
        <div v-masonry transition-duration="0.3s" gutter="10" item-selector=".grid-item" column-width="200">
            <tile v-for="result in this.data.results" :key="result.id" class="grid-item" :class="{'grid-item-size2' : result.tileSizeBig}" :data="result"></tile>
        </div>
        <!-- <div id="vue-grid">
            <tile v-for="result in this.data.results" :key="result.id" :data="result"></tile>
        </div> -->
        <div class="">
            <button 
                class="btn btn-primary my-4" 
                type="submit"
                @click="loadMore"
            >
                Load more
            </button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
// var json = require('./payload.json');
import ajax from '../../utilities/ajax';
import tile from './tile.vue';
// import Masonry from 'masonry-layout';
import {VueMasonryPlugin} from 'vue-masonry';
Vue.use(VueMasonryPlugin);
export default {
    data() {
        return {
            data: {
                page: 0,
                results: []
            },
        };
    },
    created() {
        
    },
    mounted() {
        this.loadMore();
        
        this.loadMore();
        this.$nextTick(() => {
            this.data.page = 2;
        });

       
    },
    methods: {
        reDraw(){
            this.$nextTick(() => {
                this.$redrawVueMasonry();
            });            
        },
        // TODO Create more generic axios requests.
        loadMore() {
            const self = this;
            this.data.page = this.data.page+1;
            let payload = {page: this.data.page};
            ajax.post('/api/trending/', payload)
                .then(response => {
                    // console.log(response);
                    self.updateData(response);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        
        updateData(data) {
            this.data.page = data.page;
            this.data.results.push(...this.parseData(data.results));
            this.reDraw();
        },
        parseData(results) {
            const start = (this.data.page-1) * 20;
            const threshold = 8.3;
            for (let i = 0; i < results.length; i++) {
                let result = results[i];               
                // this adds a value of title to series and changes the id to specify if its a series or movie.
                if (typeof result.title == 'undefined') {
                    result.title = result.name;
                    result.id = "/series/" + result.id;
                } 
                else {
                    result.id = "/movie/" + result.id;
                }
                // This adds a tileSizeBig boolean to objects that are over the threshold in their rating
                if(result.vote_average > threshold) {
                    result.tileSizeBig = true;
                } else {
                    result.tileSizeBig = false;
                }
               
                results[i] = result;
            };
            return results;
        },
    },
    components: {
        tile
    }
}
</script>

<style lang="scss" scoped>
</style>
