<template>
    <div class="nav">
        <div class="menu">
            <button type="button" @click="onShow" :at-top-change="atTopChanged" :class="{'no-pointer': isAtTop}">
                <img id="vue-burger" src="/img/burger.svg" alt="hamburg menu toggle" />
            </button>
            <vueMenu ref="vue_menu"></vueMenu>
        </div>
        <search v-if="!isMobile"></search>
        <img src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-blue-61ce76f69ce1e4f68a6031d975df16cc184d5f04fa7f9f58ae6412646f2481c1.svg">
    </div>
</template>

<script>
import search from './search.vue';
import vueMenu from './menu.vue';
export default {
    data() {
        return {
            isAtTop: true,
        }
    },
    computed: {
        isMobile() {
            return (screen.width <= 760)
        },
    },
    methods: {
        onShow() {
            this.$refs.vue_menu.onShow();
        },
        atTopChanged(boolean) {
            this.isAtTop = boolean;
        }
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
        justify-content: flex-end;
        align-items: center;
        min-height: $menu-height;
        margin-bottom: 20px;
        padding: 0 20px;

        & > img {
            height: $menu-height;
            margin-left: 15px;
        }

    }

    .menu {
        .no-pointer {
            cursor: inherit;
        }
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        position: fixed;
        top: 20px;
        left: 60px;
        height: auto;
        background-color: $primary;
        border-radius: calc(#{$menu-height} / 2);
        box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
        z-index: 1000;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: $menu-height;
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

    @media (min-width: 768px) {
        .menu {
            flex-direction: row;
            align-items: center;
            height: $menu-height;
            width: auto;
        }
    }

</style>
