<template>
    <form @submit.prevent="onSubmit">
        <input type="text" v-model="form._data.search" name="form.search" id="">
        <button type="submit">
            <img src="/img/search.svg" alt="submit search button">
        </button>
    </form>
</template>

<script>
import {Form} from '../form';

export default {
     data() {
        return {
            form: new Form('{"search":""}')
        };
    },
    methods: {
        onSubmit() {
            this.form.post('/api/search')
                .then(status => console.log(status));
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
