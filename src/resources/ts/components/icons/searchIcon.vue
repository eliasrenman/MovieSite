<template>
<span @click="$emit('onClick')" @keyup.enter="$emit('onClick')" class="size">
    <svg class="size" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24.51 24.51">
        <g transform="translate(0.51 0.51)">
            <path d="M20.517,18.415H19.41l-.392-.378a9.123,9.123,0,1,0-.981.981l.378.392v1.107l7.007,6.993,2.088-2.088Zm-8.408,0a6.306,6.306,0,1,1,6.306-6.306A6.3,6.3,0,0,1,12.109,18.415Z" transform="translate(-3.51 -3.51)" />
            <path d="M0,0H24V24H0Z" fill="none" />
        </g>
    </svg>
</span>
</template>

<script>
export default {
    props: ['color']
}
</script>

<style lang="scss" scoped>
@use '../../../sass/variables' as *;
.size {
    height: 15px;
    width: 15px;
}
svg {
    fill: white;
}
@media (min-width: 768px) {
    .size {
        height: 22px;
        width: 22px;
    }
    svg {
        fill: $primary;
    }
}
</style>