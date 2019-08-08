<template>
    <div class="overlay-image vue-tile" v-bind:class="{ big: data.tileSizeBig }"><a :href="data.id">
        <img class="image" :src="'https://image.tmdb.org/t/p/w500' + data.poster_path" alt="Alt text" /> 
        <div class="hover">
            <div class="text">
                <h1 v-text="data.title"></h1>
                <p v-if="data.tileSizeBig" v-text="data.overview"></p>
                <p >Rating: {{data.vote_average}} / 10</p>
            </div>
        </div>
    </a></div>
</template>

<script>
export default {
    props: ['data'],
}
</script>


<style lang="scss" scoped>

    .overlay-image {
        position: relative;
        width: 100%;
    }

    .overlay-image .image {
        display: block;
        width: 100%;
        height: auto;
    }
    .overlay-image .text {
        color: #fff;
        line-height: 1.5em;
        text-shadow: 2px 2px 2px #000;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
    }   
    .overlay-image .hover {
        position: absolute;
        top: 0;
        height: 102%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
    }
    .overlay-image:hover .hover {
         opacity: 1;
    }
    .overlay-image .hover {
        background-color: rgba(0,0,0,0.5);
    }

    .vue-tile {
        margin: 10px;
        height: 268px;
        width: 182px;
    };
    .big {
        margin: 12px;
        height: 556px;
        width: 378px;
    };
</style>
