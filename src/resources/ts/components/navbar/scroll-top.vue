<template>
    <div>
        <go-top
        :size=60
        :bottom-gap=80
        :right=60
        :bg-color="'#ff7043'"
        :box-shadow="'10px 10px 20px rgba(0, 0, 0, 0.3)'"
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