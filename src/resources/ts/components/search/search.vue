<template>
  <div class="">
      <list v-if="data.results.length > 0" :data=data>

      </list>
      <div v-else>
          No search results found
      </div>
  </div>
</template>

<script>
import list from '../list/list.vue';
export default {
    props: [
        'data'
    ],
    components: {
        list
    }
}
</script>

<style lang="scss" scoped>

</style>