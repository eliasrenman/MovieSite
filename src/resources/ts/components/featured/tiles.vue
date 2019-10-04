<template>
    <div class="resContainer">
        <div class="row justify-content-md-center">
            <div class="col-md-10 resultsCol">
                <div class="masonary" v-masonry transition-duration="0.0s" gutter="10" fitWidth: true item-selector=".grid-item" column-width="200">
                    <tile v-for="result in this.data.results" :key="result.id" class="grid-item" :class="{'grid-item-size2' : result.tileSizeBig}" :data="result"></tile>
                </div>
            </div>
        </div>        
        <div class="row justify-content-md-center">
                <div class="col-md-1 text-align-center">
                    <button 
                        class="btn btn-primary my-4 loadMore" 
                        type="submit"
                        @click="loadMore"
                    >
                        Load more
                    </button>
                </div>
             
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import ajax from '../../utilities/ajax';
import tile from './tile.vue';
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
        this.loadMore()
            .then(respone => {
                this.loadMore();
            }).catch(error => console.log(error));
    },
    
    methods: {
        reDraw(){
            this.$nextTick(() => {
                this.$redrawVueMasonry();
            });            
        },
        // TODO Create more generic axios requests.
        loadMore() {
            return new Promise((resolve, rejects) => {
                const self = this;
                this.data.page = this.data.page+1;
                let payload = {page: this.data.page};
                ajax.post('/api/v1/trending/', payload)
                    .then(response => {
                        // console.log(response);
                        resolve("");
                        self.updateData(response);
                    })
                    .catch(error => {
                        rejects("");
                        console.log(error);
                    });
            });
            
        },
        
        updateData(data) {
            // this.data.page = data.page;
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
    #list {
    margin: 0 auto;
    }
.resContainer{
    margin-left: 15px;

    .resultsCol{
        margin-left: 8vw;
    }
    .masonary{
        width:80vw;
    }

    @media (min-width: 1441px){
        .loadMore{
            font-size: 2rem;
        }
    }

    @media (max-width: 1025px){
        .resultsCol{
            margin-left: 20vw;
        }
    }

    @media (max-width: 769px){
        .resultsCol{
            margin-left: 25vw;
        }
    }

    @media (max-width: 555px){
        .resultsCol{
            margin-left: 10vw;
        }

        .loadMore{
            margin-left: 25vw;
        }
    }
}
</style>