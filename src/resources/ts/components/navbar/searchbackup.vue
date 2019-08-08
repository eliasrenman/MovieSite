// /**This is for later refrence when creating /search */
<template>
    <form @submit.prevent="onSubmit">
        <input type="text" v-model="form.data.search" name="search" id="">
        <button type="submit">
            <img src="/img/search.svg" alt="submit search button">
        </button>
    </form>
</template>

<script>
import {Form} from '../../utilities/form';

export default {
    data() {
        return {
            form: new Form('{"search":""}')
        };
    },
    methods: {
        onSubmit() {
            window.location.href = '/search/' + this.form.data.search;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
