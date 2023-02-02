<template>
  <div class="container">
    <div class="itemleft">
      <Ip>
        <template #main>
          <ChartOne/>
        </template>
      </Ip>
      <Ip>
        <template #main>
          <ChartThree/>
        </template>
      </Ip>
    </div>
    <div class="itemright">
      <Ip>
        <template #main>
          <ChartTwo/>
        </template>
      </Ip>
      <Ip>
        <template #main>
          <ChartFour/>
        </template>
      </Ip>
    </div>
  </div>
</template>

<script setup>
import Ip from '../../../components/ItemPage.vue'
import ChartOne from '../../../components/ChartOne.vue'
import ChartTwo from '../../../components/ChartTwo.vue'
import ChartThree from '../../../components/ChartThree.vue'
import ChartFour from '../../../components/ChartFour.vue'
</script>

<style lang="scss">
.container{
  width: 100%;
  margin: 0 auto;
  display: flex;
  .itemleft,.itemright{
    flex:1;
  }
}
</style>