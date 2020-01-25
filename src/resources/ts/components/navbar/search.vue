<template>
    <div class="search-field">
        <input type="text" 
            v-model="search" 
            name="search" 
            placeholder="Search..." 
            id=""
            @keyup.enter="onSubmit"

        >
        <search-icon
            class="clickable"
            @onClick="onSubmit()"
            tabindex="0"
        />
    </div>
</template>

<script>
import searchIcon from '../icons/searchIcon';
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
    components: {
        searchIcon
    }
};
</script>

<style lang="scss" scoped>
@use '../../../sass/variables' as *;
    .clickable {
        cursor: pointer;
    }
    .search-field {
        display: flex;
        align-items: center;
        margin-top: 1vh;
        input {
            width: 100%;
            margin-right: 10px;
            padding: 5px;
            font-size: 18px;
            font-weight: 300;
            background-color: $text-light;
            border: none;
            outline: none;
            border-radius: 5px 5px 5px 15px;
            &::placeholder {
                font-weight: 300;
                color: $primary-text-light;
            }

        }

    }

    @media (min-width: 768px) {
        
        .search-field {

            input {
                margin-right: 5px;
                border-bottom: 2px solid $primary;
                border-radius: 0;
            }
        }

    }

</style>
