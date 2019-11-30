<template>
    <div class="container">

        <iframe class="video"  :src="'https://www.youtube.com/embed/' + trailer" 
            frameborder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    </div>

</template>

<script>
const _ = require('lodash');

export default {
    props: [
        'data',
    ],
    computed: {
        isMobile() {
            return (screen.width <= 760);
        },
        trailer() {
            return _.find(this.data, 
                {site: "YouTube", type: "Trailer"}
            ).key;
        }
    }
}
</script>
<style lang="scss" scoped>
    .container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
    }
    .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>