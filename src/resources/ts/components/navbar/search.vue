<template>
    <div class="search-field">
        <input type="text" v-model="search" name="search" placeholder="Search..." id="">
        <img src="/img/search.svg" alt="submit search button" @click="onSubmit"> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
        };
    },
    methods: {
        onSubmit() {
            window.location.href = '/search/?query=' + this.search;
        },
    },
};
</script>

<style lang="scss" scoped>
@use '../../../sass/variables' as *;

    .search-field {
        display: flex;
        align-items: center;

        input {
            width: 100%;
            margin-right: 10px;
            padding: 5px;
            font-size: 18px;
            font-weight: 300;
            background-color: $text-light;
            border: none;
            border-radius: 5px 5px 5px 15px;
            outline-color: $primary;

            &::placeholder {
                font-weight: 300;
                color: $primary-text-light;
            }

        }

        img {
            filter: brightness(10);
        }

    }

    @media (min-width: 768px) {
        
        .search-field {

            input {
                margin-right: 5px;
                border-bottom: 2px solid $primary;
                border-radius: 0;
            }
         
            img {
                filter: brightness(1);
            }

        }

    }

</style>
