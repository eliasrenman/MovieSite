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
                    <div v-if="payload.type == 'series'">
                        <p>
                            <p class="d-inline pk">Episode Runtime:</p> 
                            {{ payload.episode_run_time[0] }} min
                        </p>
                        <p>
                        <p>
                            <p class="d-inline pk">Seasons:</p> 
                            {{ payload.number_of_seasons }}
                        </p>
                            <p class="d-inline pk">Episodes:</p> 
                            {{ payload.number_of_episodes }}
                        </p>
                        <p>
                            <p class="d-inline pk">First release date:</p> 
                            {{ payload.first_air_date }}
                        </p>
                    </div>
                    <!-- MOVIE SPECIFIC START -->
                    <div v-else-if="payload.type == 'movie'">
                        <p>
                            <p class="d-inline pk">Runtime:</p> 
                            {{ payload.runtime }} min
                        </p>
                        <p>
                            <p class="d-inline pk">Release date:</p> 
                            {{ payload.release_date }}
                        </p>
                    </div>
                    <!-- BOTH MOVIE AND SERIES SPECIFIC START -->
                    <div v-if="payload.created_by">
                        <p>
                            <p class="d-inline pk">Creators:</p> 
                            {{ creators.join(', ') }}
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
                <p>{{ payload.overview }}</p>
                
                <h2 class="bottom-border pt-42px">Information</h2>
                <p v-if="payload.homepage">
                    <p class="d-inline pk">Website: </p>
                    <a :href=payload.homepage>{{payload.homepage}}</a>
                </p>
            </div>
        </div>
        <div class="row mx-0">
            <div class="col-md-6"></div>
        </div>
    </div>
</template>

<script>
//TODO: Create api routes for getting stars on shows and series.
//TODO: Acutally style this stuff and also comment functions.

const { getName } = require('country-list');
const _ = require('lodash');
export default {
    props: [
        'data'
    ],
    data: () => {
        return {
            payload: "null"
        }
    },
    created() {
        this.payload = JSON.parse(this.data);
    },

    computed: {
        image_cover() {
            return "https://image.tmdb.org/t/p/w500/" + this.payload.poster_path;
        },
        genres() {
            return this.payload.genres.map(a => a.name);
        },
        name() {
            switch(this.payload.type) {
                case('series'): 
                    return this.payload.name;
                case('movie'):
                    return this.payload.title;
                default:
                    return '';
            }
        },
        country_origin() {
            switch(this.payload.type) {
                case('series'): 
                    return _.uniq(
                        this.payload.origin_country.map(
                            a => getName(a)
                        ));
                case('movie'):
                    return _.uniq(
                        this.payload.production_countries.map(
                            a => a.name
                        ));
                default:
                    return [''];
            } 
        },
        creators() {
            return this.payload.created_by.map(a => a.name);
        },
        original_name() {
            if(
                this.payload.original_name &&
                this.name != this.payload.original_name) {
                
                return this.payload.original_name;
            }
            return undefined;
        }
    }
    
}
</script>
<style lang="scss" scoped>
    $primary_color: aqua;
    .pk {
        color: $primary_color;
    }

</style>