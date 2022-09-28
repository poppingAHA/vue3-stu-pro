<template>
  <div class="item">
    <slot name="main"></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
    .item{
        height: 5.125rem;
        // border: 1px solid rgb(181, 180, 180);
        margin: 0.25rem;
        background-color: rgba(154, 154, 154, 0.655);
    }
</style>