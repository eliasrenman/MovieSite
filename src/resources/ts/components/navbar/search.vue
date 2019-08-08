<template>
    <form @submit.prevent="onSubmit">
        <input type="text" v-model="search" name="search" id="">
        <button type="submit">
            <img src="/img/search.svg" alt="submit search button">
        </button>
    </form>
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
            window.location.href = '/search/' + this.data.search;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
