<template>
    <div class="container md-fluid">
        <div class="row pt-105px mx-0">
            <div class="col-md-4 offset-md-1 order-md-last px-md-0">
                <img :src=image_cover class="border-radius-5 img-cover" alt="Image cover"/>
                <div class="px-md-15px">
                    <p>
                        <p class="d-inline pk">Genre:</p> 
                        {{ genres.join(', ') }}
                    </p>
                    <!-- SERIES SPECIFIC START -->
                    <div v-if="data.type == 'series'">
                        <p>
                            <p class="d-inline pk">Episode Runtime:</p> 
                            {{ data.episode_run_time[0] }} min
                        </p>
                        <p>
                        <p>
                            <p class="d-inline pk">Seasons:</p> 
                            {{ data.number_of_seasons }}
                        </p>
                            <p class="d-inline pk">Episodes:</p> 
                            {{ data.number_of_episodes }}
                        </p>
                        <p>
                            <p class="d-inline pk">First release date:</p> 
                            {{ data.first_air_date }}
                        </p>
                    </div>
                    <!-- MOVIE SPECIFIC START -->
                    <div v-else-if="data.type == 'movie'">
                        <p>
                            <p class="d-inline pk">Runtime:</p> 
                            {{ data.runtime }} min
                        </p>
                        <p>
                            <p class="d-inline pk">Release date:</p> 
                            {{ data.release_date }}
                        </p>
                    </div>
                    <!-- BOTH MOVIE AND SERIES SPECIFIC START -->
                    <div v-if="producers">
                        <p>
                            <p class="d-inline pk">Producer(s):</p> 
                            {{ producers.join(', ') }}
                        </p>
                    </div>
                    <p>
                        <p class="d-inline pk">Produced in:</p> 
                        {{ country_origin.join(', ') }}
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <h1 class="pt-0">{{ name }}</h1>
                <h2 v-if="original_name" class="under-title">{{original_name}}</h2>
                <p>{{ data.overview }}</p>
                
                <h2 class="bottom-border pt-42px">Information</h2>
                <p v-if="stars">
                    <p class="d-inline pk">Stars: </p>
                    {{ stars.slice(0,5).join(', ') }}
                </p>
                <p v-if="payload.homepage">
                    <p class="d-inline pk">Website: </p>
                    <a :href=data.homepage>{{data.homepage}}</a>
                </p>

            </div>
        </div>
        <div class="row mx-0">
            <div class="col-md-6"></div>
        </div>
    </div>
</template>

<script>

const { getName } = require('country-list');
const _ = require('lodash');
export default {
    props: [
        'data'
    ],
    computed: {
        /**
         * Gets the path for the image cover
         */
        image_cover() {
            return "https://image.tmdb.org/t/p/w500/" + this.data.poster_path;
        },
        
        /**
         * Returns the genres that a series or person is in.
         */
        genres() {
            return this.data.genres.map(a => a.name);
        },

        /**
         * Returns the name of a series or movie.
         */
        name() {
            switch(this.data.type) {
                case('series'): 
                    return this.data.name;
                case('movie'):
                    return this.data.title;
                default:
                    return [''];
            }
        },
        
        /**
         * Returns a list of countries that the movie or series origniated from
         */
        country_origin() {
            switch(this.data.type) {
                case('series'): 
                    return _.uniq(
                        this.data.origin_country.map(
                            a => getName(a)
                        ));
                case('movie'):
                    return _.uniq(
                        this.data.production_countries.map(
                            a => a.name
                        ));
                default:
                    return [''];
            } 
        },        
        /**
         * Returns a list of Producers
         */
        producers() {
            let producers = _.filter(this.payload.crew,['job', 'Producer']);
            return producers.map(a => a.name);
        },

        /**
         * Returns the original name of a series or movie
         * if it is not the same as the translated name.
         */
        original_name() {
            if(
                this.data.original_name &&
                this.name != this.data.original_name) {
                
                return this.data.original_name;
            }
            return undefined;
        },

        /**
         * Returns a list of the names of the cast. 
         */
        stars() {
            return this.payload.cast.map(a => a.name);
        },
    }
    
}
</script>
<style lang="scss" scoped>
    $primary_color: aqua;
    .pk {
        color: $primary_color;
    }

</style>