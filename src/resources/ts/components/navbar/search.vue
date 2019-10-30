<template>
    <div class="search-field">
        <input type="text" v-model="search" name="search" id="">
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
            window.location.href = '/search/?search=' + this.search;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
