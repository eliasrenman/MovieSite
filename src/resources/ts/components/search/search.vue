<template>
  <div class="">
      <list-index></list-index>
  </div>
</template>

<script>
import listIndex from './searchList.vue';
export default {
    props: [
        'data'
    ],
    data: () => {
        return {
            payload: "null"
        }
    },
    created() {
        this.payload = JSON.parse(this.data);
    },
    components: {
        listIndex
    }
}
</script>

<style lang="scss" scoped>

</style>