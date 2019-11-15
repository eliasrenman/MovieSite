<template>
    <div class="flex-center">
        <div class="rows wrapper">

            <div class="flex-center ">
                <div class="search-field flex-center">

                    <input type="text" class="v-spacing" 
                        v-model="query" 
                        @keyup.enter="onSubmit"
                        name="search" 
                        id=""
                        placeholder="Search..."
                    >
                    <img src="/img/search.svg" class="v-spacing" 
                        alt="submit search button" 
                        @click="onSubmit"
                        @keyup.enter="onSubmit"
                        tabindex="0"
                    > 
                </div>
            </div>
            <div class="radio-buttons">
                <!-- TODO: make labels clickable ☜(ﾟヮﾟ☜) -->
                <input type="radio" name="multi" 
                    v-model="endpoint"
                    v-bind:value="'multi'"
                >
                <label for="multi">All</label>
                <input type="radio" name="movie" 
                    v-model="endpoint"
                    v-bind:value="'movie'"
                >
                <label for="movie">Movies</label>
                <input type="radio" name="tv" 
                    v-model="endpoint"
                    v-bind:value="'tv'"
                >
                <label for="tv">Series</label>
                <input type="radio" name="person" 
                    v-model="endpoint"
                    v-bind:value="'person'"
                >  
                <label for="person">People</label>                
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            query: '',
            oldQuery: undefined,
            endpoint: '',
            oldEndpoint: undefined,
        };
    },
    mounted() {
        this.query = new URLSearchParams(
            window.location.search.substring(1)
        ).get('query');
        let category = new URLSearchParams(
            window.location.search.substring(1)
        ).get('category');
        if (category) {
            this.endpoint = category;
        } else {
            this.endpoint = 'multi';
        }
        
    },
    watch: {
        query(newVal) {
            if(this.query != null)
                this.setParam('query', newVal);
        },
        endpoint(newVal) {
            if(this.endpoint != null)
                this.setParam('category', newVal);
        }
        
    },
    methods: {
        onSubmit() {
            if(this.query !== this.oldQuery 
                || this.endpoint !== this.oldEndpoint) {
                this.oldQuery = this.query;
                this.oldEndpoint = this.endpoint;
                
                this.$emit('onSubmit', 
                    this.endpoint
                );
            }
        },

        /**
         * Sets a query param and updates the 
         */
        setParam(key, value) {
            const params = new URLSearchParams(location.search)
            params.set(key, value);
            let url = location.protocol + 
                '//' + location.host + 
                location.pathname + "?" + 
                params.toString();
            window.history.replaceState("Movie site", "Movie site", url);
        },
    },
}
</script>

<style lang="scss" scoped>
@use '../../../sass/variables' as *;

    .v-spacing {
        margin: 0px 10px;
    }
    .rows {
        flex-direction: row;
    }
    .wrapper {
        background: $primary;
        border-radius: 48px;
        box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
    }
    .radio-buttons {
        font-size: 18px;
        font-weight: 300;
        color: white;
    }
    .search-field {
        input {
            width: 100%;
            margin-right: 10px;
            border-bottom: 2px solid $primary;
            padding: 5px;
            font-size: 18px;
            font-weight: 300;
            background-color: $text-light;
            border: none;
            border-radius: 5px;
            outline-color: $primary;
            &::placeholder {
                font-weight: 300;
                color: $primary-text-light;
            }
        };
        img {
            filter: brightness(10);
        };
    }
</style>