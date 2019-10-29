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
                <!-- MOVIE SPECIFIC START -->
                <div v-else-if="payload.type == 'movie'">
                    <p>
                        <span>Runtime:</span> 
                        {{ payload.runtime }} min
                    </p>
                    <p>
                        <span>Release date:</span> 
                        {{ payload.release_date }}
                    </p>
                </div>
                <!-- BOTH MOVIE AND SERIES SPECIFIC START -->
                <div v-if="payload.created_by">
                    <p>
                        <span>Creators:</span> 
                        {{ creators.join(', ') }}
                    </p>
                </div>
                <p>
                    <span>Produced in:</span> 
                    {{ country_origin.join(', ') }}
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