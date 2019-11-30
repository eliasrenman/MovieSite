<template>
  <div class="details-rating">
        {{ score }} / 10
        <div class="stars">
            <div class="full">★★★★★</div>
            <div class="percent" :style="{width: 'calc( ' + score + ' * 10%)'}">★★★★★</div>
        </div>
        <span class="small">{{ votes }} votes</span>
    </div>
</template>

<script>
export default {
    props: [
        'score',
        'votes'
    ]
}
</script>
<style lang="scss" scoped>
    @use '../../../sass/variables' as *;

    .details-rating {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        font-size: 22px;
        color: $text-light;
        background-color: $primary;
        border-radius: 10px;

        .stars {
            position: relative;
            margin: 0 0 5px 10px;
            font-size: 32px;

            .full {
                color: $primary-text-light;
            }

            .percent {
                position: absolute;
                top: 0;
                color: $text-light;
                overflow-x: hidden;
            }

        }

        .small {
            margin-left: auto;
            font-size: 0.8em;
        }

    }
</style>