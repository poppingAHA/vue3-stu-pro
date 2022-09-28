<template>
  <div>
    <h2>人数统计</h2>
    <div id="chartone" class="one"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import link from "../api/Link.js";
import url from "../api/url.js";

// let data = reactive({})
let xData = reactive([]);
let yData = reactive([]);

let $echarts = inject("echarts");
onMounted(() => {
  let mychart = $echarts.init(document.getElementById("chartone"));

  link(url.chartDataOne).then((ok) => {
    let { data } = ok;

    xData = data.map((v) => v.num);
    yData = data.map((v) => v.title);

    mychart.setOption({
      xAxis: {
        type: "value",
        axisLine:{
            lineStyle:{
                color:"#fff"
            }
        }
      },
      yAxis: {
        type: "category",
        data: yData,
        axisLine:{
            lineStyle:{
                color:"#fff"
            }
        }
      },
      grid:{
        top:"3%",
        left:"1%",
        right:"6%",
        bottom:"3%",
        containLabel:true
      },
      series: [
        {
          type: "bar",
          data: xData,
          itemStyle:{
            normal:{
                barBorderRadius:[0,20,20,0],
                color:new $echarts.graphic.LinearGradient(0,0,1,0,[
                    {
                        offset:0,
                        color:"#005eaa"
                    },
                    {
                        offset:0.5,
                        color:"#339ca8"
                    },
                    {
                        offset:1,
                        color:"#cda819"
                    },
                ])
            }
          }
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
.one {
  height: 4.5rem;
}
</style>