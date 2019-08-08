<template>
  <div class="h-100 vue-menu" v-show="show">
    <a @click="onShow">
      <img src="/img/close.svg"/>
    </a>

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
            console.log('this is happening');
            this.show = !this.show;
        },
    },  
};
</script>

<style lang="scss" scoped>
.vue-menu {
    width: 230px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: #877e95;
}
.vue-menu img {
    margin-left: 170px;
    margin-top: 25px;
    height: 33px;
    width: 33px;
}
</style>
