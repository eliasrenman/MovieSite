
<template>
    <a :href="data.id" class="grid-item">
        <img class="grid-item-image" :src="'https://image.tmdb.org/t/p/w500' + data.poster_path" alt="Alt text" /> 
        <span class="grid-item-hover">
            <p class="grid-item-title" v-text="data.title"></p>
            <p class="grid-item-description" v-if="data.tileSizeBig" v-text="data.overview"></p>
            <p class="grid-item-rating">Rating: {{data.vote_average}} / 10</p>
        </span>
    </a>
</template>


<script>
export default {
    props: ['data'],
}
</script>


<style lang="scss" scoped>

    @use '../../../sass/variables' as *;

    .grid-item {
        position: relative;
        height: 100%;
        background-color: $primary;
        overflow: hidden;
        overflow-wrap: break-word;

        &.large {
            grid-column-start: auto;
            grid-column-end: span 2;
            grid-row-start: auto;
            grid-row-end: span 2;
        }

        .grid-item-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: height 0.3s, filter 0.3s;
        }

        &:hover .grid-item-image {
            height: 105%;
            filter: blur(2px);
        }

        .grid-item-hover {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            padding: 20px;
            text-align: center;
            text-decoration: none;
            color: #fff;
            background-color: rgba($primary, 0.8);
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s, visibility 0.3s;

            p {
                margin: 0;
            }

        }

        &:hover .grid-item-hover {
            visibility: visible;
            opacity: 1;
        }

        .grid-item-title {
            font-size: 28px;
            line-height: 1em;
            text-transform: uppercase;
        }

    }
    
</style>
