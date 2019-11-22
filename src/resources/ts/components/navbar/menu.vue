<template>
  <div class="vue-menu" v-bind:class="{ active: isActive }">
    <a :href="activeUrl('/')">Home</a>
    <a :href="activeUrl('/toplist/movie')">Top movies</a>
    <a :href="activeUrl('/toplist/series')">Top series</a>
    <a :href="activeUrl('/trending/movie')">Trending movies</a>
    <a :href="activeUrl('/trending/series')">Trending series</a>
    <a v-if="!isMobile" :href="activeUrl('/search')">Search</a>
    <search v-else></search>
  </div>
</template>

<script>
import search from './search.vue';
import  {throttle} from 'lodash';
export default {
    data() {
        return {
            isActive: true
        };
    },
    created () {
        this.isActive = !this.isMobile;
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    },
    computed: {
        isMobile() {
            return (screen.width <= 760)
        },
    },
    methods: {
        handleScroll: throttle(function() {
            if(this.isMobile) 
                return;

            if(window.scrollY > 0 && this.isActive) {
                this.isActive = false;
            } else if (window.scrollY == 0 && !this.isActive) {
                this.isActive = true;
            }
        }, 100, {leading: false, trailing: true}),
        
        onShow() {
            this.isActive = !this.isActive;
        },

        activeUrl(url) {
            let path = window.location.pathname;
            if (url == path) {
                return "#"
            }
            return url;
        }
    },
    components: {
        search
    }
};
</script>

<style lang="scss" scoped>

    @use '../../../sass/variables' as *;

    .vue-menu{
        display: flex;
        flex-direction: column;
        width: 0;
        height: 0;
        font-size: 0;
        transition: all 0.3s;

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            height: $menu-height;
            width: $menu-height;
            background-color: $primary;
            border: none;
            border-radius: calc(#{$menu-height} / 2);
            outline: none;
        }

        a {
            display: flex;
            align-items: center;
            text-transform: uppercase;
            text-decoration: none;
            color: $text-light;
            border-bottom: 1px solid rgba($text-light, 0.5);
            opacity: 0;
            transition: padding 0.3s, opacity 0.3s 0.3s, letter-spacing 0.3s, color 0.3s;
        }

        .search-field {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s;
        }

        &.active {
            width: calc(100vw - 120px);
            height: 100%;
            font-size: 18px;
            padding: 0 15px 15px;

            button {
                max-height: $menu-height;
                max-width: $menu-height;
                padding: 15px;
            }

            a {
                padding: 5px 0;
                opacity: 1;

                &:hover {
                    letter-spacing: 1px;
                    color: $primary-hover;
                }

            }

            .search-field {
                max-height: 100px;
                margin-top: 10px;
            }

        }

    }

    @media (min-width: 768px) {
        .vue-menu {
            flex-direction: row;
            width: 100%;

            a {
                border-bottom: none;
            }

            &.active {
                width: auto;
                padding: 0 15px;

                a {
                    padding: 0 10px;
                }

            }

        }

    }

</style>
