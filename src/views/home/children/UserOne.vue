<template>
  <router-view v-if="isRouterAlive" />
</template>

<script>
import {ref,provide,nextTick} from "vue"
export default {
  setup() {
    // 局部组件刷新
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);

    return {
      isRouterAlive,
    };
  }
}
</script>

<style>

</style>