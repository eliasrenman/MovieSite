<template>
    <div>
        <go-top
        :size=60
        :bottom-gap=80
        :right=60
        :bg-color="'#6699cc'"
        :box-shadow="'5px 5px 10px rgba(0,0,0,0.5)'"
        :max-width="0"
        ></go-top>
    </div>
</template>

<script>
import GoTop from '@inotom/vue-go-top';

export default {
  components: {
    GoTop
  },
}
</script>