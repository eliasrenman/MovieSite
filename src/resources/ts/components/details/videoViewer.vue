<template>
    <iframe width="560" height="315" :src="'https://www.youtube.com/embed/' + trailer" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>

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

<style>

</style>