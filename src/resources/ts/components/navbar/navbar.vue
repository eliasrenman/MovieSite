<template>
    <div class="nav">
        <div class="menu">
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

    @use '../../../sass/variables' as *;

    .nav {
        display: flex;
        align-items: center;
        min-height: $menu-height;
        margin-bottom: 20px;
        padding: 0 20px;

        form {
            margin-left: auto;
        }

    }

    .menu {
        display: flex;
        position: fixed;
        top: 20px;
        height: $menu-height;
        background-color: $primary;
        border-radius: calc(#{$menu-height} / 2);
        box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
        z-index: 1000;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: $menu-height;
            padding: 15px;
            background-color: transparent;
            border: none;
            outline: none;

            img {
                height: 100%;
            }

        }

    }

</style>
