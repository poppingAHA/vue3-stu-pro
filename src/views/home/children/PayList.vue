<template>
  <div class="content">
    <div class="inputDom">
      <el-input v-model="input" placeholder="请输入收款金额" />
      <el-button type="success" @click="makeQRcode">生成二维码</el-button>
    </div>
    <div class="qrcode" ref="qrcodeDom"></div>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import QRcode from "qrcodejs2";
const input = ref("");

let qrcodeDom = ref(null);

let makeQRcode = () => {
  qrcodeDom.value.innerHtml = "";
  nextTick(() => {
    new QRcode(qrcodeDom.value, {
      text: input.value, //二维码内容
      colorDark: "#000", //二维码的颜色
      colorLight: "#fff", //二维码的背景色
      correctLevel: QRcode.CorrectLevel.H,
    });
  });
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .el-button{
    margin-top: 20px;
  }
  .qrcode {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 22px;
  }
  .inputDom {
    width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
}
</style>