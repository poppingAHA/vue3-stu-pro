<template>
  <div>
    <h2>保修统计图</h2>
    <div id="chartthree" class="three"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import link from "../api/Link.js";
import url from "../api/url.js";

let $echarts = inject("echarts");
onMounted(() => {
  let mychart = $echarts.init(document.getElementById("chartthree"));

  link(url.chartDataThree).then((ok) => {
    mychart.setOption({
      legend: { top: "bottom" },
      tooltip: {},
      series: [
        {
          type: "pie",
          data: ok.data,
          radius: [10, 100],
          center: ["50%", "45%"],
          roseType: "area",
        },
      ],
    });
  });
});
</script>

<style lang="scss" scoped>
h2 {
  height: 0.6rem;
  color: #fff;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.25rem;
}
.three {
  height: 4.5rem;
}
</style>