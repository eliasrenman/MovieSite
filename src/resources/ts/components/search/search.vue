<template>
  <div class="">
      <list 
            v-if="page_data.results.length > 0" 
            :data=page_data 
            @update-list="updateList"
            :use_counter="false"
        ></list>
      <div v-else>
          <h1 class="display-center">No search results found</h1>
      </div>
  </div>
</template>

<script>
import list from '../list/list.vue';
import Ajax from '../../utilities/ajax';
export default {
    props: [
        'data'
    ],
    data: () => {
        return {
            page_data: undefined
        }
    },
    created() {
        this.page_data = this.data;
    },
    methods: {
        /**
         * Gets a new page from the database and updates this.page_data
         * @param page_index page to lookup.
         */
        updateList(page_index) {
            let params = new URLSearchParams(
                window.location.search.substring(1)
            );
            Ajax.get('/api/v1/search/', {
                search: params.get("search"),
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
        list
    }
}
</script>

<style lang="scss" scoped>

</style>