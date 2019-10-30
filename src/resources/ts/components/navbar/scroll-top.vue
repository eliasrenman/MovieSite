<template>
  <go-top
    :size=60
    :bottom-gap=50
    :right=170
    :bg-color="'#6699cc'"
    :box-shadow="'5px 5px 10px rgba(0,0,0,0.5)'"
  ></go-top>
</template>

<script>
import GoTop from '@inotom/vue-go-top';

export default {
  components: {
    GoTop
  }
}
</script>