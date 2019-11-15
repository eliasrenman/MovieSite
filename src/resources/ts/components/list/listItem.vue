<template>

    <li class="list-item">
        <span class="entry-counter" v-if="use_counter">
            {{ list_index + 1 }}
        </span>
        <a :href=link>
            <p>
                <span class="title">{{ name }}</span>
                <span class="date">
                    <span v-if="show_media_type"> 
                        {{ media_type_string }}
                    </span>
                    
                    <span v-if="release_date"> 
                        {{ "(" + release_date.split('-')[0] + ")" }}
                    </span>
                    <span v-if="data.vote_average">
                        Rating: {{ data.vote_average }} / 10
                    </span> 
                </span>
            </p>
            <img alt="Poster" :src=image_cover>
        </a>
    </li>
</template>

<script>
export default {
    props: {
        'data': {
            type: Object,
            default: undefined
        },
        'use_counter': {
            type: Boolean,
            default: false
        },
        'media_type': {
            type: String,
            default: undefined
        },
        'show_media_type': {
            type: Boolean,
            default: true
        }
    },
    computed: {

        /**
         * Returns the list index
         */
        list_index() {
            return this.$vnode.key;
        },

        /**
         * Gets the path for the image cover
         */
        image_cover() {
            if(this.data.profile_path || this.data.poster_path) {
                let media_type = this.media_type !== "" ? 
                    this.media_type : this.data.media_type;
                switch(media_type) {       
                    case('person'):
                        return "https://image.tmdb.org/t/p/w500/" + this.data.profile_path;
                    default:
                        return "https://image.tmdb.org/t/p/w500/" + this.data.poster_path;
                }
            }
            //TODO: Create a better placeholder image if a image is missing.
            return "https://via.placeholder.com/200x300";
            
        },

        /**
         * Returns the name of a series or movie.
         */
        name() {
            if (this.data.title) 
                return this.data.title;
            
            return this.data.name;
        },

        /**
         * Returns the media type as a string.
         */
        media_type_string() {
           switch(this.media_type) {
                case('tv'): 
                    return 'Series';
                case('movie'):
                    return 'Movie';
                case('person'):
                    return this.data.known_for_department;
                
                default:
                    return '';
            } 
        },

        /**
         * Returns the link of the movie or series
         */
        link() {
            switch(this.media_type) {
                case('tv'): 
                    return '/series/' + this.data.id;
                case('movie'):
                    return '/movie/' + this.data.id;
                default:
                    return '/person/' + this.data.id;
            } 
        },

        /**
         * Returns the date of the movie or series release date.
         */
        release_date() {
            switch(this.media_type) {
                case('tv'): 
                    return this.data.first_air_date;
                case('movie'):
                    return this.data.release_date;
                case('person'):
                    return this.data.release_date;
                default:
                    return '';
            } 
        }
    }
}
</script>
<style lang="scss" scoped>
    @use '../../../sass/variables' as *;
    
    p {
        // max-height: 150px;
        padding: 15px 0px;    
    }


    .list-item {
        
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        color: #fff;
        background-color: $primary;
        border-radius: 10px 0 0 10px;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
        animation: slideLeft 1s ease-in-out both;
    }
    
    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-left: 30px;
        text-decoration: none;
        color: var(--c-primary-text);
        background-color: var(--c-primary);
        transition: color 0.3s;
    }

​    a:hover {
        color: #fff;
    }

    p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0;
        font-size: 16px;
    }

    .title {
        margin-bottom: 3px;
        padding: 0 10px 2px 0;
        font-size: 1.8em;
        border-bottom: 1px solid rgba(255,255,255,0.5);
    }

    img {
        height: 130px;
        width: 200px;
        background-color: rgba(255,255,255,0.2);
        object-fit: cover;
        object-position: 50% 5%;
        clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
        filter: grayscale(50%);
        transition: object-position 0.3s, filter 0.3s;
    }

    a:hover img {
        object-position: 50% 10%;
        filter: grayscale(0%);
    }

    .entry-counter {
        width: 80px;
        text-align: center;
        font-weight: 300;
    }

</style>