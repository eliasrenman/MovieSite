<template>
    <div>
        <div class="toplist">

            <list-item 
                v-for="(item, index) in data.results" 
                :data=item 
                :key=" index_offset + index"
                :use_counter="use_counter"
                :media_type="get_media_type(item.media_type)"
                :show_media_type=show_media_type
            ></list-item>
        </div>
        <div class="display-center">
            <paginate v-if="data.total_pages > 1"
                v-model="data.page"
                :page-count=data.total_pages
                :page-range="3"
                :click-handler="paginationCallback"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'">
            </paginate>
        </div>
    </div>
</template>

<script>
import listItem from './listItem.vue';
import paginate from 'vuejs-paginate';

export default {
    props: {
        "data": {
            type: Object,
            default: undefined
        },
        'use_counter': {
            type: Boolean,
            default: false,
        },
        'media_type': {
            type: String,
            default: "-1"
        },
        'show_media_type': {
            type: Boolean,
            default: true
        }
    },
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
        },
        get_media_type(media_type) {
            if (this.media_type == "-1") {
                return media_type;
            }
            return this.media_type;
        }
    },
    components: {
        'list-item': listItem,
        'paginate': paginate,
    }
}
</script>

<style lang="scss">
    @use '../../../sass/variables' as *;
    
    .toplist {
        width: 50%;
        margin: 80px;
        font-size: 40px;
    }

    .display-center {
        display: flex;
        justify-content: center
    }

    .pagination {
        display: inline-block;
    }

    .pagination li {
        color: black;
        float: left;
        padding: 8px 16px;
        border: 1px solid #ddd; /* Gray */
        text-decoration: none;
        list-style-type: none;
    }

    .pagination li.active {
        background-color: $primary;
        color: white;
    }

    .pagination li:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .pagination li:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
</style>