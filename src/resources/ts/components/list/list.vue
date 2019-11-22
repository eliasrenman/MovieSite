<template>
    <div>
        <div class="list-wrapper">
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
            <div class="details">
            
            </div>
        </div>
        <div class="flex-center">
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

    .list-wrapper {
        display: flex;
        margin-top: 40px;
    }

    .details {
        display: none;
    }
    
    .toplist {
        font-size: 40px;
    }

    .pagination {
        font-size: 16px;
        margin: 10px 0;
        padding-left: 0;

        li {
            display: inline-block;
            float: left;
            margin: 0 2px;
            text-decoration: none;
            list-style-type: none;
            color: black;
            background-color: $bg-faded;
            border: none;
            border-radius: 5px;

            a {
                display: block;
                padding: 8px 16px;
                outline: none!important;
            }

            &.active {
                background-color: $primary;
                color: white;
            }

            &:first-child, &:last-child {
                background-color: $primary;
                color: $text-light;
            }

            &:first-child {
                border-radius: 20px 5px 5px 20px;
            }

            &:last-child {
                border-radius: 5px 20px 20px 5px;
            }
        }
    }

    @media (min-width: 768px) {
        
        .list-wrapper {
            margin: 40px -10px 0;

            & > div {
                margin: 0 10px;
            }

        }

        .toplist {
            width: 50%;
        }

        .details {
            display: block;
        }

    }
    
</style>