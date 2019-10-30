<template>
  <div class="vue-menu" v-bind:class="{ active: isActive }">
    <button type="button" @click="onShow">
      <img src="/img/close.svg"/>
    </button>

    <a href="/toplist">Top list</a>
    <a href="/search">Search</a>
  </div>
</template>

<script>
export default {
    data() {
        return {
        isActive: false
        };
    },
    methods: {
        onShow() {
            this.isActive = !this.isActive;
        },
    },  
};
</script>

<style lang="scss" scoped>

    @use '../../../sass/variables' as *;

    .vue-menu{
        display: flex;
        height: 100%;
        font-size: 0;
        transition: all 0.3s;

        button {
          max-width: 0px;
          padding: 0;
          transition: all 0.3s;

          img {
              width: 100%;
          }

        }

        a {
            display: flex;
            align-items: center;
            text-transform: uppercase;
            text-decoration: none;
            color: #fff;
            transition: padding 0.3s;
        }

        &.active {
            display: flex;
            font-size: 22px;

            button {
              max-width: $menu-height;
              padding: 15px;
            }

            a {
                padding: 0 5px;
            }

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

    }

</style>
