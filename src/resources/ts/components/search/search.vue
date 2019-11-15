<template>
  <div class="">
      <search-field v-on:onSubmit="onSubmit"></search-field>
      <list 
            v-if="page_data && page_data.results.length > 0" 
            :data=page_data 
            @update-list="updateList"
            :use_counter="false"
        ></list>
      <div v-else-if="searchQuery && searchQuery.length > 0">
          <h1 class="display-center">No search results found</h1>
      </div>
  </div>
</template>

<script>
import list from '../list/list.vue';
import Ajax from '../../utilities/ajax';
import searchField from './searchField.vue';
export default {
    props: [
        'data'
    ],
    data: () => {
        return {
            page_data: undefined,
            endpoint: '/api/v1/search/',
        }
    },
    
    created() {
        this.page_data = this.data;
    },
    methods: {
        onSubmit() {
            this.updateList('1');
        },

        category() {
            let params = new URLSearchParams(
                window.location.search.substring(1)
            );
            switch (params.get('category')) {
                case 'tv': return 'tv';
                case 'movie': return 'movie';
                case 'person': return 'person';
                default: return '';
            }
            return '';
        },

        searchQuery() {
            return new URLSearchParams(
                window.location.search.substring(1)
            ).get("query");
        },

        /**
         * Gets a new page from the database and updates this.page_data
         * @param page_index page to lookup.
         */
        updateList(page_index) {
            
            Ajax.get(this.endpoint + this.category(), {
                query: this.searchQuery(),
                page: page_index,
            })
            .then((res) => {
                this.page_data = res;
                this.setParam("page", this.page_data.page)
            })
            // IGNORED
            .catch((err) => { });
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
    components: {
        list,
        searchField
    }
}
</script>

<style lang="scss" scoped>

</style>