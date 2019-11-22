<template>
    <div class="container">
        <div @click="scrollTop()">

            Hello world
        </div>
    </div>
  <!-- <go-top
    :size=60
    :bottom-gap=50
    :right=120
    :bg-color="'#6699cc'"
    :box-shadow="'5px 5px 10px rgba(0,0,0,0.5)'"
  ></go-top> -->
</template>

<script>
import GoTop from '@inotom/vue-go-top';

export default {
  components: {
    GoTop
  },
  methods: {
    scrollTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })

        // this.moveToDown = !this.moveToDown
    }
  },
}
</script>

<style lang="scss" scoped>
    .container{ 
        position: fixed;
        z-index: 1000;
    }
</style>