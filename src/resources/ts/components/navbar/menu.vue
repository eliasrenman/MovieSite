<template>
  <div class="vue-menu" v-show="show">
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
        show: false
        };
    },
    methods: {
        onShow() {
            this.show = !this.show;
        },
    },  
};
</script>

<style lang="scss" scoped>

    @use '../../../sass/variables' as *;

    .vue-menu{
        display: flex;
        position: absolute;
        height: 100%;
        background-color: $primary;
        border-radius: calc(#{$menu-height} / 2);

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

            img {
                height: 100%;
            }

        }

    }

</style>
