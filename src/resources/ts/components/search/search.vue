<template>
  <div class="">
      <list v-if="page_data.results.length > 0" :data=page_data @update-list="updateList">

      </list>
      <div v-else>
          No search results found
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
        updateList(page_index) {
            let params = new URLSearchParams(
                window.location.search.substring(1)
            );
            Ajax.get('/api/v1/search/', {
                search: params.get("search"),
                page: page_index,
            })
            .then((res) => {
                //TODO: Here update the query parameter page to the relevant index.
                this.page_data = res;
            })
            // IGNORED
            .catch((err) => { });
        }
    },
    components: {
        list
    }
}
</script>

<style lang="scss" scoped>

</style>