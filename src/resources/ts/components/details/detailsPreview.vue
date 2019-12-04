<template>
    <div class="details-main">
        <div class="details-side">
            <div style="inline-block">
                <a 
                    :href=link
                    class="link max-width"
                >
                    <h1>{{name}}</h1>
                    <h2 
                        v-if="original_name">{{original_name}}
                    </h2>
        
                </a>
            </div>
            
            <img
                :src=image_cover
                alt="Image cover"
            />
            <div v-if="data.type != 'person'">
                <!-- SERIES SPECIFIC START -->
                <div v-if="data.type == 'series'">
                    <p>
                        <span>First release date:</span> 
                        {{ data.first_air_date }}
                    </p>
                </div>
                <!-- MOVIE SPECIFIC START -->
                <div v-else-if="data.type == 'movie'">
                    <p>
                        <span>Release date:</span> 
                        {{ data.release_date }}
                    </p>
                </div>
            </div>
        </div>
        
        <rating v-if="data.vote_average && data.vote_count" class="max-width"
            :score="data.vote_average" :votes="data.vote_count"/>
        
        <div class="details-content">
            <h2 class="mb-0" v-if="synopsis">Synopsis</h2>
            <p class="mt-1 max-width" v-if="synopsis">{{ synopsis }}</p>
            <a :href=link>More info</a>
        </div>
        
    </div>
</template>

<script>
import rating from '../details/rating.vue';

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
            if(this.data.profile_path || this.data.poster_path) {
                switch (this.data.type) {
                    case 'person': 
                        return "https://image.tmdb.org/t/p/w500/" + this.data.profile_path;
                    default: 
                        return "https://image.tmdb.org/t/p/w500/" + this.data.poster_path;
                }
            }
            switch(this.data.type) {
                case('person'): {
                    return '/img/placeholder_person.png';
                }
                default: {
                    return '/img/placeholder_movie.png';
                }
            }
        },
        
        synopsis() {
            let allowedLength = 300;
            let str = undefined;
            if(this.data.overview) {
                str = this.data.overview.substring(0,allowedLength);
            } else if(this.data.biography) {
                str = this.data.biography.substring(0,allowedLength);
            }
            if(str && str.length >= allowedLength) {
                str += "...";
            }
            return str;
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
            let original_name = this.data.type == 'movie' ? 
                this.data.original_title:
                this.data.original_name;
            
            if(this.name &&
                this.name != original_name) {
                
                return original_name;
            }
            return undefined;
        },

        /**
         * Returns the link of the movie or series
         */
        link() {
            let media_type = this.data.type;
            switch(media_type) {
                case('tv'): 
                    return '/series/' + this.data.id;
                case('movie'):
                    return '/movie/' + this.data.id;
                default:
                    return '/person/' + this.data.id;
            } 
        },
    },
    components: {
        rating,
    }
}
</script>
<style lang="scss" scoped>

    @use '../../../sass/variables' as *;
    @use "sass:map";
    
    .link {
        display: inline-block;
        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
    h1, h2 {
        color: $primary-text;
    }
    .mt-1 {
        margin-top: 5px;
    }

    .mb-0 {
        margin-bottom: 0;
    }
    .details-main {
        position: fixed;
        left: 60%;
        top: 10%;
        img {
            width: 300px;
            max-width: 100%;
            align-self: center;
        }
    }
    .max-width {
        max-width: 80%;
    }

    a {
        color: $primary-text;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

</style>