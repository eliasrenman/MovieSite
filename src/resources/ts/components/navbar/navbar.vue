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
        position: relative;
        position: fixed;
        top: 20px;
        z-index: 1000;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: $menu-height;
            width: $menu-height;
            padding: 15px;
            background-color: $primary;
            border: none;
            border-radius: calc(#{$menu-height} / 2);
            outline: none;
            box-shadow: 5px 5px 10px rgba(0,0,0,0.5);

            img {
                height: 100%;
            }

        }

    }

</style>
