<template>
    <div class="display-center search-field">
        <input type="text" v-model="query" name="search" id="">
        <img src="/img/search.svg" alt="submit search button" @click="onSubmit"> 
    </div>

</template>

<script>
export default {
    data() {
        return {
            query: '',
        };
    },
    mounted() {
        this.query = new URLSearchParams(
            window.location.search.substring(1)
        ).get('query');
        
    },
    computed: {
      
    },
    watch: {
        query(newVal) {
            if(this.query != null)
                this.setParam('query', newVal);
        },
        
    },
    methods: {
        onSubmit() {
            window.location.href = '/search/?query=' + this.query;
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

</style>