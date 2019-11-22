<template>
    <div class="container">
        <div @click="scrollTop()">

            Hello world
        </div>
    </div>
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