<template>
  <nav class="vue-nav" role="navigation" aria-label="main navigation">
    <div class="d-flex">
      <div class="d-flex justify-content-start">
        <div @click="onShow">
          <img id="vue-burger" src="/img/burger.svg" alt="hamburg menu toggle" />
        </div>
      </div>
      <div class="d-flex ml-auto justify-content-end align-content-center flex-wrap">
        <search></search>
      </div>
    </div>
    <vueMenu ref="vue_menu"></vueMenu>
  </nav>
</template>

<script>
import search from './search.vue';
import vueMenu from './menu.vue';
export default {

    methods: {
        onShow() {
            this.$refs.vue_menu.onShow();
        },
    },
    components: {
        search,
        vueMenu
    }
};
</script>

<style lang="scss" scoped>
    #vue-burger {
        height: 39px;
        width: 39px;
    }
    .vue-nav {
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-bottom: 20px;
    }
</style>
