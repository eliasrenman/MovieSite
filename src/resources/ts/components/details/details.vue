<template>
    <div class="details-main">
        <div class="details-side">
            <img :src=image_cover alt="Image cover"/>
            <div>
                <p>
                    <span>Genre:</span> 
                    {{ genres.join(', ') }}
                </p>
                <!-- SERIES SPECIFIC START -->
                <div v-if="payload.type == 'series'">
                    <p>
                        <span>Episode Runtime:</span> 
                        {{ payload.episode_run_time[0] }} min
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
                        <span>Seasons:</span> 
                        {{ payload.number_of_seasons }}
                    </p>
                        <span>Episodes:</span> 
                        {{ payload.number_of_episodes }}
                    </p>
                    <p>
                        <span>First release date:</span> 
                        {{ payload.first_air_date }}
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
        <div class="details-content">
            <h1>{{ name }}</h1>
            <h2 v-if="original_name">{{original_name}}</h2>
            <p>{{ payload.overview }}</p>
            
            <h2>Information</h2>
            <p v-if="payload.homepage">
                <span>Website: </span>
                <a :href=payload.homepage>{{payload.homepage}}</a>
            </p>
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

    @use '../../../sass/variables' as *;
    @use "sass:map";
    
    .details-main {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;

        & > div {
            margin: 0 10px;
        }
    }

    .details-side {

        img {
            width: 100%;
        }

    }

    .details-content {
        flex-shrink: 1;
    }

    @each $size, $pixels in $breakpoints {

        @media (min-width: $pixels) {

            @if $details-flex-reverse == $size {
                .details-main {
                    flex-direction: row-reverse;
                    flex-wrap: nowrap;
                }
            }
            
            .details-side {
                min-width: map.get($details-side-width, $size);
            }

        }
    
    }

</style>