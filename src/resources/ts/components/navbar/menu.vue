<template>
  <div class="vue-menu" v-show="show">
    <button type="button" @click="onShow">
      <img src="/img/close.svg"/>
    </button>

    <a href="/toplist">Top list</a>
    <a href="/search">Search</a>
  </div>
</template>

<script>
export default {
    data() {
        return {
        show: false
        };
    },
    methods: {
        onShow() {
            this.show = !this.show;
        },
    },  
};
</script>

<style lang="scss" scoped>

    @use '../../../sass/variables' as *;

    .vue-menu{
        display: inline-block;
        height: 100%;
        background-color: $primary;
    }

</style>
