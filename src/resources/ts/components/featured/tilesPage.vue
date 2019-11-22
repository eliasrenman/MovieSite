<template>
    <div class="grid-container" 
        v-infinite-scroll="throttledLoadMore"
        infinite-scroll-distance="1300"
    >
        <tile v-for="result in data.results" :key="result.id" :class="{'large' : result.tileSizeBig}" :data="result"></tile>
        <div class="fadeout"></div>
    </div>
</template>

<script>
import Vue from 'vue'
import ajax from '../../utilities/ajax';
import tile from './tile.vue';
const _ = require('lodash');
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
        /**
         * This loads more tiles twice.
         */
        this.loadMore()
            .then(respone => {
                this.loadMore();
            }).catch(error => console.log(error));
    },
    methods: {
        throttledLoadMore: _.throttle(function() {
                this.loadMore(); 
            }, 500, {
                trailing: false,
            }
        ),
        loadMore() {
            return new Promise((resolve, rejects) => {
                this.data.page = this.data.page+1;
                let payload = {page: this.data.page};
                ajax.get('/api/v1/trending/', payload)
                    .then(response => {
                        resolve("");
                        this.updateData(response);
                    })
                    .catch(error => {
                        rejects("");
                        console.log(error);
                    });    
            });   
        },
        /**
         * This pushes more data to the array of existing movies.
         */
        updateData(data) {
            this.data.results.push(...this.parseData(data.results));
        },
        
        /**
         * Parses incomming data from database.
         */
        parseData(results) {
            const start = (this.data.page-1) * 20;
            const threshold = 7.9;
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
    
    @use '../../../sass/variables' as *;
    @use "sass:map";

    .grid-container {
        display: grid;
        grid-template-rows: repeat(auto, auto);
        grid-template-columns: repeat(#{map.get($grid-columns, xs)}, 1fr);
        grid-gap: 10px;
        grid-auto-flow: row dense;
        width: 100%;
        margin: auto;
    }
    @each $size, $pixels in $breakpoints {

        @media (min-width: $pixels) {

            .grid-container {
                grid-template-columns: repeat(#{map.get($grid-columns, $size)}, 1fr);
            }

        }
    
    }

</style>