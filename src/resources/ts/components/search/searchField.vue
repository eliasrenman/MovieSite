<template>
    <div class="display-center search-field">
        <div class="rows">

            <div class="display-center">
                <input type="text" class="v-spacing" 
                    v-model="query" 
                    @keyup.enter="onSubmit"
                    name="search" 
                    id=""
                >
                <img src="/img/search.svg" class="v-spacing" 
                    alt="submit search button" 
                    @click="onSubmit"
                    @keyup.enter="onSubmit"
                    tabindex="0"
                > 
            </div>
            <div>
                <input type="radio" name="category" 
                    v-model="endpoint"
                    v-bind:value="'multi'"
                > All<br>
                <input type="radio" name="category" 
                    v-model="endpoint"
                    v-bind:value="'movie'"
                > Movies<br>
                <input type="radio" name="category" 
                    v-model="endpoint"
                    v-bind:value="'tv'"
                > Series<br>  
                <input type="radio" name="category" 
                    v-model="endpoint"
                    v-bind:value="'person'"
                > People<br>  

            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            query: '',
            oldQuery: undefined,
            endpoint: '',
            oldEndpoint: undefined,
        };
    },
    mounted() {
        this.query = new URLSearchParams(
            window.location.search.substring(1)
        ).get('query');
        let category = new URLSearchParams(
            window.location.search.substring(1)
        ).get('category');
        if (category) {
            this.endpoint = category;
        } else {
            this.endpoint = 'multi';
        }
        
    },
    watch: {
        query(newVal) {
            if(this.query != null)
                this.setParam('query', newVal);
        },
        endpoint(newVal) {
            if(this.endpoint != null)
                this.setParam('category', newVal);
        }
        
    },
    methods: {
        onSubmit() {
            if(this.query !== this.oldQuery 
                || this.endpoint !== this.oldEndpoint) {
                this.oldQuery = this.query;
                this.oldEndpoint = this.endpoint;
                
                this.$emit('onSubmit', 
                    this.endpoint
                );
            }
        },

        /**
         * Sets a query param and updates the 
         */
        setParam(key, value) {
            const params = new URLSearchParams(location.search)
            params.set(key, value);
            let url = location.protocol + 
                '//' + location.host + 
                location.pathname + "?" + 
                params.toString();
            window.history.replaceState("Movie site", "Movie site", url);
        },
    },
}
</script>

<style lang="scss" scoped>
    .v-spacing {
        margin: 0px 10px;
    }
    .rows {
        flex-direction: row;
    }
</style>