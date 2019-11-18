<template>
    <div class="details-main">
        <div class="details-side">
            <img :src=image_cover alt="Image cover"/>
            <div v-if="data.type != 'person'">
                <p>
                    <span>Genre:</span> 
                    {{ genres.join(', ') }}
                </p>
                <!-- SERIES SPECIFIC START -->
                <div v-if="data.type == 'series'">
                    <p>
                        <span>Episode Runtime:</span> 
                        {{ data.episode_run_time[0] }} min
                    </p>
                    <p>
                        <span>Seasons:</span> 
                        {{ data.number_of_seasons }}
                    </p>
                        <span>Episodes:</span> 
                        {{ data.number_of_episodes }}
                    </p>
                    <p>
                        <span>First release date:</span> 
                        {{ data.first_air_date }}
                    </p>
                </div>
                <!-- MOVIE SPECIFIC START -->
                <div v-else-if="data.type == 'movie'">
                    <p>
                        <span>Runtime:</span> 
                        {{ data.runtime }} min
                    </p>
                    <p>
                        <span>Release date:</span> 
                        {{ data.release_date }}
                    </p>
                </div>
                <!-- BOTH MOVIE AND SERIES SPECIFIC START -->
                <div v-if="producers">
                    <p>
                        <span>Producer(s):</span> 
                        {{ producers.join(', ') }}
                    </p>
                </div>
            </div>
            <div v-else>
                <p>
                    <span>Birthday:</span> 
                    {{ data.birthday }}
                </p>
                <p v-if="data.deathday">
                    <span>Deathday:</span> 
                    {{ data.deathday }}
                </p>
                <p v-if="data.place_of_birth">
                    <span>Place of birth:</span> 
                    {{ data.place_of_birth }}
                </p>
            </div>
        </div>
        <div class="details-content">
            <h1>{{ name }}</h1>
            <h2 v-if="original_name">{{original_name}}</h2>
            <p v-if="data.overview">{{ data.overview }}</p>
            <p v-if="data.biography">{{ data.biography }}</p>
            
            <h2>Information</h2>
            <p v-if="stars">
                <span>Stars: </span>
                {{ stars.slice(0,5).join(', ') }}
            </p>
            <p v-if="data.homepage">
                <span>Website: </span>
                <a :href=data.homepage>{{data.homepage}}</a>
            </p>    
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
            switch (this.data.type) {
                case 'person': 
                    return "https://image.tmdb.org/t/p/w500/" + this.data.profile_path;
                default: 
                    return "https://image.tmdb.org/t/p/w500/" + this.data.poster_path;
            }
            
        },
        
        /**
         * Returns the genres that a series or person is in.
         */
        genres() {
            if(this.data.genres)
                return this.data.genres.map(a => a.name);
            return undefined;
        },

        /**
         * Returns the name of a series or movie.
         */
        name() {
            switch(this.data.type) {
                case('movie'):
                    return this.data.title;
                default:
                    return this.data.name;
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
            let producers = _.filter(this.data.crew,['job', 'Producer']);
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
            if(this.data.cast)
                return this.data.cast.map(a => a.name);
            
        },
    }
    
}
</script>
<style lang="scss" scoped>

    @use '../../../sass/variables' as *;
    @use "sass:map";
    
    .details-main {
        display: flex;
        flex-wrap: wrap;
        width: 1200px;
        max-width: 100%;
        margin: 40px auto;

        & > div {
            margin: 0 10px;
        }

        p > span {
            color: $primary-text;
        }
    }

    .details-side {
        display: flex;
        flex-direction: column;

        img {
            width: 400px;
            max-width: 100%;
            align-self: center;
        }

        a {
            overflow-wrap: break-word;
        }

    }

    .details-content {
        flex-shrink: 1;

        h1, h2 {
            color: $primary-text;
        }

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
                max-width: map.get($details-side-width, $size);
            }

        }
    
    }

</style>