<template>
    <div class="menu">
        <button @click="onShow">
          <img id="vue-burger" src="/img/burger.svg" alt="hamburg menu toggle" />
        </button>
        <search></search>
        <vueMenu ref="vue_menu"></vueMenu>
    </div>
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
