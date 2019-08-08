<template>
    <div>
        <div class="row">
            <div  v-for="result in this.data.results" :key="result.id">
                <tile :data="result"></tile>
            </div>
        </div>
        <div class="row">
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
// var json = require('./payload.json');
import ajax from '../../utilities/ajax';
import tile from './tile.vue';


export default {
    data() {
        return {
            data: {
                SizeBigCounter: 0,
                page: 0,
                results: []
            },
        };
    },
    created() {
        this.loadMore();
    },
    methods: {
        // TODO Create more generic axios requests.
        loadMore() {
            const self = this;
            this.data.page = this.data.page+1;
            let payload = {page: this.data.page};
            console.log(payload);
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
                    this.data.SizeBigCounter++;
                    // console.log(result.vote_average + " Title: " + result.title + " " + i)
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
    .btn {
        margin: 0 auto;
    }
    
</style>
