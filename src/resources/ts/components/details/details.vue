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
                    <div v-if="data.created_by">
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
                <p>{{ data.overview }}</p>
                
                <h2 class="bottom-border pt-42px">Information</h2>
                <p v-if="data.homepage">
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
//TODO: Create api routes for getting stars on shows and series.
//TODO: Acutally style this stuff and also comment functions.

const { getName } = require('country-list');
const _ = require('lodash');
export default {
    props: [
        'data'
    ],
    computed: {
        image_cover() {
            return "https://image.tmdb.org/t/p/w500/" + this.data.poster_path;
        },
        genres() {
            return this.data.genres.map(a => a.name);
        },
        name() {
            switch(this.data.type) {
                case('series'): 
                    return this.data.name;
                case('movie'):
                    return this.data.title;
                default:
                    return '';
            }
        },
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
        creators() {
            return this.data.created_by.map(a => a.name);
        },
        original_name() {
            if(
                this.data.original_name &&
                this.name != this.data.original_name) {
                
                return this.data.original_name;
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