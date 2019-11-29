<template>
    <li class="list-item">
        <span class="entry-counter" v-if="use_counter">
            {{ list_index + 1 }}
        </span>
        <a :href=link v-on:click.prevent="onClick">
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
            <!--<img alt="Poster" :src=image_cover>-->
            <div class="poster" :style="{ backgroundImage: `url(${image_cover})` }"></div>
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
    methods: {
        onClick() {
            if(this.isMobile) {
                window.location.href = this.link;

            } else {
                this.$emit('getPreview', this.detail_endpoint)
            }
        }
    },
    computed: {
        isMobile() {
            return (screen.width <= 760);
        },
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

        detail_endpoint() {
            let media_type = this.media_type !== "" ? 
                this.media_type : this.data.media_type;
            
            return [media_type, this.data];
                
        },

        /**
         * Returns the media type as a string.
         */
        media_type_string() {
            let media_type = this.media_type !== "" ? 
                    this.media_type : this.data.media_type;
           switch(media_type) {
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
            let media_type = this.media_type !== "" ? 
                    this.media_type : this.data.media_type;
            switch(media_type) {
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
            let media_type = this.media_type !== "" ? 
                    this.media_type : this.data.media_type;
            switch(media_type) {
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

    .list-item {
        display: flex;
        align-items: stretch;
        max-width: 100%;
        margin-bottom: 15px;
        color: $text-light;
        background-color: $primary;
        border-radius: 20px 0 0 20px;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
        overflow: hidden;

        .entry-counter {
            align-self: center;
            padding: 20px;
            padding-right: 0;
            text-align: center;
            font-weight: 300;
        }

        a {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            width: 100%;
            text-decoration: none;
            color: var(--c-primary-text);
            background-color: var(--c-primary);
            transition: color 0.3s;

            &:hover {
                color: #fff;
            }

            p {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: 100%;
                margin: 0;
                padding: 20px 0 20px 20px;    
                font-size: 16px;
            }

            .title {
                margin-bottom: 5px;
                padding: 0 10px 10px 0;
                font-size: 1.8em;
                line-height: 1.1em;
                border-bottom: 1px solid rgba(255,255,255,0.5);
            }

            .poster {
                min-width: 80px;
                background-size: cover;
                background-position: center;
                clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
            }

        }

    }

    @media (min-width: 768px) {
        
        .list-item {
            
            .entry-counter {
                padding: 40px;
                padding-right: 0;
            }
            
            a {

                p {
                    padding: 15px 0 15px 40px;
                }

                .poster {
                    min-width: 200px;
                    background-position: 50% 0;
                    filter: grayscale(50%);
                    transition: background-position 0.3s, filter 0.3s;
                }

                &:hover .poster {
                    background-position: 50% 10%;
                    filter: grayscale(0%);
                }

            }

        }
    
    }

</style>