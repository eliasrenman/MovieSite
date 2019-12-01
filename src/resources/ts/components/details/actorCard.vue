<template>
    <div class="container">
        <a :href="'/person/' + data.id">
            <img :src="image_cover" class="card-img-top" :alt="'card for actor ' + data.name"/>
            <div class="text-wrapper">

                <h4>{{data.name}}</h4>
                <p>{{data.character}}</p>
            </div>
        </a>
    </div>
    
</template>

<script>
export default {
    props: [
        'data'
    ],
    computed: {
        image_cover() {
            if(this.data.profile_path)
                return "https://image.tmdb.org/t/p/w138_and_h175_face/" + this.data.profile_path;
            return '/img/placeholder_person_small.png';
        },
    }
}
</script>

<style lang="scss" scoped>
    @use '../../../sass/variables' as *;
    .container {
        flex: 0 0 auto;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: $primary;
        width: 138px;
        padding: 0;
        min-height: 250px;
        margin: 0 7px;
    }
    img {
        margin-right: 15px;
        border-radius: 10px 10px 0 0; 
    }
    .text-wrapper {
        padding: 10px;
        padding-top: 0;
    }

    a {
        text-decoration: none;
        color: #fff;
    }
    h4,p {
        margin: 0 0;
        width: 120px;
        
    }
    p {
        padding-top: 1px;
        size: 0.9em;
    }

</style>