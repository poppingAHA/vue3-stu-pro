<template>
  <div class="content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>水电费缴费管理</span>
        </div>
      </template>
      <el-form label-width="100px" :model="form">
        <el-form-item label="使用时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" />
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="户主">
              <el-input placeholder="请输入户主姓名" v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼盘名称">
              <el-input placeholder="请输入楼盘名称" v-model="form.housename" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="表号">
              <el-input placeholder="请输入表号" v-model="form.num" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款金额">
              <div class="inputDom">
                <el-input v-model="form.amount" placeholder="请输入收款金额" />
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="success" @click="makeQRcode">生成二维码</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="qrcode" ref="qrcodeDom"></div>
  </div>
</template>

<script setup>
import { nextTick, ref, reactive } from "vue";
import QRcode from "qrcodejs2";

const form = reactive({
  date1: '',
  date2: '',
  name: '',
  housename: '',
  num: '',
  amount: ''
})

let qrcodeDom = ref(null);

let makeQRcode = () => {
  qrcodeDom.value.innerHtml = "";
  nextTick(() => {
    new QRcode(qrcodeDom.value, {
      text: "使用时间:" + form.date1 + "-" + form.date2 + ";户主:" + form.name + ";楼盘名称:" + form.housename + ";表号:" + form.num + ";收款金额:" + form.amount, //二维码内容
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

  // .el-button {
  //   margin-top: 10px;
  // }

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

  .box-card {
    width: 800px;
    margin: 0 auto;
    text-align: center;

    .card-header {
      font-size: 20px;
    }

    .el-form {
      .el-form-item {
        margin-bottom: 10px;

        .el-form-item__content {
          .el-col {
            ::v-deep(.el-date-editor.el-input) {
              width: 100%;

              .el-input__wrapper {
                width: 100%;
                box-sizing: border-box;
              }
            }
          }
        }

        .el-input {
          width: 100%;
        }

        .text-center {
          width: 100%;
        }
      }
    }
  }
}
</style>