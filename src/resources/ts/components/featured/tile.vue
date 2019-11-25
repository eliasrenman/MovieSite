
<template>
    <a :href="data.id" class="grid-item">
        <img class="grid-item-image" :src="image_cover" :alt=data.title  /> 
        <span class="grid-item-hover">
            <div class="grid-item-title">
                <p v-text="data.title"></p>
            </div>
            <p class="grid-item-description" v-if="data.tileSizeBig" v-text="synopsis"></p>
            <p class="grid-item-rating">{{data.vote_average}} / 10</p>
        </span>
    </a>
</template>


<script>
export default {
    props: ['data'],
    computed: {
        image_cover() {
            if (this.data.tileSizeBig) 
                return 'https://image.tmdb.org/t/p/w500' + this.data.poster_path;
            return 'https://image.tmdb.org/t/p/w300' + this.data.poster_path;
        },
        synopsis() {
            let allowedLength = 300;
            let str = undefined;
            if(this.data.overview) {
                str = this.data.overview.substring(0,allowedLength);
            } else if(this.data.biography) {
                str = this.data.biography.substring(0,allowedLength);
            }
            if(str && str.length >= allowedLength) {
                str += "...";
            }
            return str;
        },
    }
}
</script>


<style lang="scss" scoped>

    @use '../../../sass/variables' as *;

    .grid-item {
        position: relative;
        height: 100%;
        overflow: hidden;

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
            padding: 15px;
            text-align: center;
            text-decoration: none;
            color: #fff;
            background-color: rgba(darken($primary, 50%), 0.8);
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s, visibility 0.3s;

            p {
                width: 100%;
                margin: 5px 0;
            }

        }

        &:hover .grid-item-hover {
            visibility: visible;
            opacity: 1;
        }

        .grid-item-title {
            position: relative;
            top: -20px;
            padding-bottom: 13px;
            font-size: 32px;
            font-weight: 300;
            line-height: 1.1em;
            word-break: break-word;
            border-bottom: 1px solid #fff;
            opacity: 0;
            transition: opacity 0.3s, top 0.3s;
            transition-delay: 0.4s;

            p {
                overflow-y: hidden;
                height: 100%;
                margin: 2px 0;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
            }

        }

        .grid-item-title, .grid-item-description, .grid-item-rating {
            position: relative;
            top: -20px;
            opacity: 0;
            transition: opacity 0.3s, top 0.3s;
            transition-delay: 0.3s;
        }

        &:hover .grid-item-title, &:hover .grid-item-description, &:hover .grid-item-rating {
            top: 0;
            opacity: 1;
        }

    }
    
</style>
