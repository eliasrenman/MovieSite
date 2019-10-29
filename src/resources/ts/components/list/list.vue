<template>
    <div class="">
        <list-item v-for="(item, index) in data" :data=item v-bind:key="index"></list-item>
    </div>
</template>

<script>
import listItem from './listItem.vue';
export default {
    props: [
        "data"
    ],
    components: {
        'list-item': listItem,
    }
}
</script>

<style lang="scss" scoped>
    body {
        font-family: Segoe UI, sans-serif;
        counter-reset: toplist;
    }

    .toplist {
        width: 50%;
        margin: 80px;
        font-size: 40px;
    }

​    

    .toplist .list-item::before {
        counter-increment: toplist;
        content: counter(toplist);
        width: 80px;
        text-align: center;
        font-weight: 300;
    }

    
</style>