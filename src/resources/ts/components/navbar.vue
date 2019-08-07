<template>
  <nav class="" role="navigation" aria-label="main navigation">
    <div class="nav">
     
        <div class="navbar-start">
            <div class="" id="vue-burger">
                <img src="/img/burger.svg" alt="hamburg menu toggle">
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <search></search>
                </div>
            </div>
        </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
    #vue-burger {
        height: 52px;
        width: 52px;
    };
    .nav {
        flex-grow: 1;
        flex-shrink: 0;
        align-items: stretch;
        display: flex;
    }
</style>
