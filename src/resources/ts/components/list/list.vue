<template>
    <div class="toplist">
        <list-item v-for="(item, index) in data.results" :data=item :key=" index_offset + index"></list-item>
        <paginate
            :page-count=data.total_pages
            :page-range="3"
            :click-handler="paginationCallback"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
        </paginate>
    </div>
</template>

<script>
import listItem from './listItem.vue';
import paginate from 'vuejs-paginate';

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
    methods: {

        /**
         * Pagination onclick callback function.
         * Emits to the parent component that it wishes to update the prop data.
         * 
         * @param page_index passes the page number that is clicked.
         */
        paginationCallback(page_index) {
            this.$emit('update-list', page_index);
        }
    },
    components: {
        'list-item': listItem,
        'paginate': paginate,
    }
}
</script>

<style lang="scss">
    //TODO: Add pagination styling classes.
    .toplist {
        width: 50%;
        margin: 80px;
        font-size: 40px;
    }
</style>