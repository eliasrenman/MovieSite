<template>
    <div class="toplist">
        <list-item v-for="(item, index) in data.results" :data=item :key=" index_offset + index"></list-item>
    </div>
</template>

<script>
import listItem from './listItem.vue';
export default {
    props: [
        "data"
    ],
    computed: {

        /**
         * Gets the start index offset for the first element
         */
        index_offset() {
            return (this.data.page - 1) * this.data.results.length;
        }
    },
    components: {
        'list-item': listItem,
    }
}
</script>

<style lang="scss" scoped>
    body {
        font-family: Segoe UI, sans-serif;
    }

    .toplist {
        width: 50%;
        margin: 80px;
        font-size: 40px;
    }

    // .toplist .list-item::before {
    //     // counter-increment: toplist;
    //     content: counter(toplist);
    //     width: 80px;
    //     text-align: center;
    //     font-weight: 300;
    // }

    
</style>