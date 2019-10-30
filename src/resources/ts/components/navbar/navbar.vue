<template>
    <div class="nav">
        <div class="menu">
            <button type="button" @click="onShow">
                <img id="vue-burger" src="/img/burger.svg" alt="hamburg menu toggle" />
            </button>
            <vueMenu ref="vue_menu"></vueMenu>
        </div>
        <search></search>
        <img src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-blue-61ce76f69ce1e4f68a6031d975df16cc184d5f04fa7f9f58ae6412646f2481c1.svg">
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

        & > img {
            height: $menu-height;
            margin-left: 15px;
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
