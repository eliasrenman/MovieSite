<template>
  <div class="vue-menu" v-bind:class="{ active: isActive }">
    <a :href="activeUrl('/')">Home</a>
    
    <span class="inline-dropdown" v-if="!isMobile" :class="{'active': dropdowns.topDropdown}">
        <a href="#" @click.prevent="toggleDropDown('topDropdown')" >Top list</a>
        <div  class="dropdown" 
            :class="{'show': dropdowns.topDropdown, 'active': dropdowns.topDropdown}">
            <a :href="activeUrl('/toplist/movie')">Movies</a>
            <a :href="activeUrl('/toplist/series')">Series</a>
        </div>
        
    </span>
    <span v-else>
        <a :href="activeUrl('/toplist/movie')">Top movies</a>
        <a :href="activeUrl('/toplist/series')">Top series</a>
    </span>
    
    <span class="inline-dropdown" v-if="!isMobile" :class="{'active': dropdowns.trendingDropdown}">
        <a href="#" @click.prevent="toggleDropDown('trendingDropdown')">Trending</a>

        <div  class="dropdown" 
            :class="{'show': dropdowns.trendingDropdown, 'active': dropdowns.trendingDropdown}"
        >
            <a :href="activeUrl('/trending/movie')">Movies</a>
            <a :href="activeUrl('/trending/series')">Series</a>
        </div>
    </span>
    <span v-else>
        <a :href="activeUrl('/trending/movie')">Trending movies</a>
        <a :href="activeUrl('/trending/series')">Trending series</a>
    </span>
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
            isActive: true,
            isAtTop: true,
            dropdowns: {
                "trendingDropdown": false,
                "topDropdown": false,
            }
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
        toggleDropDown(dropdown) {
            for (const [key, value] of Object.entries(this.dropdowns)) {
                if(dropdown == key) {
                    this.dropdowns[key] = !this.dropdowns[key];
                } else {
                    this.dropdowns[key] = false;
                }
            }
        },

        handleScroll: throttle(function() {
            if(this.isMobile)
                this.isAtTop = false;
                this.$emit('at-top-change', false);
                return;

            if(window.scrollY > 0 && this.isActive) {
                this.isActive = false;
                this.isAtTop = false;
                this.$emit('at-top-change', false);

            } else if (window.scrollY == 0 && !this.isActive) {
                this.isActive = true;
                this.isAtTop = true;
                this.$emit('at-top-change', true);
            }
        }, 100, {leading: false, trailing: true}),
        
        onShow() {
            if(!this.isAtTop) {
                this.isActive = !this.isActive;
                this.toggleDropDown(undefined);
            }
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
    .dropdown {
        display: none;
        position: absolute;
        top: 45px;
        background-color: $primary;
        border-radius: 0 0 10px 10px;
        a {
            margin: 5px 0;
        }
    }
    .show {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    .inline-dropdown {
        display: flex;
        align-items: center;
        position: relative;
    }

    .vue-menu{
        display: flex;
        flex-direction: column;
        width: 0;
        height: 0;
        font-size: 0;
        transition: all 0.3s;
        .active {
            background: #476b8e;
        }

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
