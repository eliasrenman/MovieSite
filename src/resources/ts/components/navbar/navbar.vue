<template>
    <div class="menu">
        <div class="open">
            <button type="button" @click="onShow">
                <img id="vue-burger" src="/img/burger.svg" alt="hamburg menu toggle" />
            </button>
            <vueMenu ref="vue_menu"></vueMenu>
        </div>
        <search></search>
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
    
    .menu {
        display: flex;
        justify-content: space-between;
    }

    .open {
        display: flex;
    }

</style>
