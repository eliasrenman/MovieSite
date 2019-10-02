
<template>
    <div>
        <div class="overlay-image" >
            <a :href="data.id">
                <img class="image" :src="'https://image.tmdb.org/t/p/w500' + data.poster_path" alt="Alt text" /> 
                <div class="hover">
                    <div class="text">
                        <h1 v-text="data.title"></h1>
                        <p v-if="data.tileSizeBig" v-text="data.overview"></p>
                        <p >Rating: {{data.vote_average}} / 10</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>


<script>
export default {
    props: ['data'],
}
</script>


<style lang="scss" scoped>
    .grid-item {
        width: 200px;
        height: 300px;
        float: left;
        margin-bottom: 10px;
    }
    .grid-item img {
        width: 200px;
        height: 300px;
        object-fit: cover;
    }
    .grid-item-size2 { 
        width: 410px;
        height: 610px;
    }
    .grid-item-size2 img {
        width: 410px;
        height: 610px;
        object-fit: cover;
    }
    .overlay-image {
        position: relative;
        width: 100%;
    }

    .overlay-image .image {
        display: block;
        max-width:100%;
        max-height:100%;
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
        height: 100%;
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

    
    @media (max-width: 555px){

        .grid-item {
            width: 300px;
            height: 400px;
            float: left;
            margin-bottom: 10px;
        }

        .grid-item-size2 { 
            width: 300px;
            height: 400px;
        }
        .grid-item-size2 img {
            width: 300px;
            height: 400px;
            object-fit: cover;
        }
        .grid-item img {
            width: 300px;
            height: 400px;
            object-fit: cover;
        }
    }
</style>
