<template>
    <div class="nav">
        <div class="menu">
            <button type="button" @click="onShow" :class="{'no-pointer': isAtTop}">
                <img id="vue-burger" src="/img/burger.svg" alt="hamburg menu toggle" />
            </button>
            <vueMenu ref="vue_menu" v-on:at-top-change="atTopChanged"></vueMenu>
        </div>
        <github-icon/>
        <search v-if="!isMobile"></search>
        <tmdb-icon/>
    </div>
</template>

<script>
import search from './search.vue';
import vueMenu from './menu.vue';
import githubIcon from '../icons/githubIcon.vue';
import tmdbIcon from '../icons/tmdbIcon.vue';
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
        vueMenu,
        githubIcon,
        tmdbIcon
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
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
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
