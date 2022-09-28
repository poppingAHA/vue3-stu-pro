<template>
  <div>
    <h2>车位统计</h2>
    <div id="chartfour" class="four"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import link from "../api/Link.js";
import url from "../api/url.js";


let $echarts = inject("echarts");
onMounted(() => {
  let mychart = $echarts.init(document.getElementById("chartfour"));

  link(url.chartDataFour).then((ok) => {
    let {data} = ok
    mychart.setOption({
      xAxis: {
        type: "category",
        data:data.day,
        axisLine:{
            lineStyle:{
                color:"#fff"
            }
        }
      },
      yAxis: {
        type: "value",
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
      tooltip:{
        trigger:"axis",
        axisPointer:{
            type:"shadow"
        }
      },
      series:[
        {
            type:"bar",
            data: data.num.一般用户,
            stack:"total"
        },
        {
            type:"bar",
            data: data.num.月租用户,
            stack:"total"
        },
        {
            type:"bar",
            data: data.num.特殊车辆,
            stack:"total"
        },
      ]
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
.four {
  height: 4.5rem;
}
</style>