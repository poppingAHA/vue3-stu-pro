<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <li
          v-for="v in MenuData"
          :class="{ current: v.current }"
          :key="v.type"
          @click="clickMenu(v)"
        >
          {{ v.txt }}
        </li>
      </ul>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="checkPsd" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            v-model="ruleForm.checkPsd"
            type="password"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="btnbool"
            type="primary"
            class="login-btn block"
            @click="submitForm(ruleFormRef)"
            >{{ model === "login" ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from "vue";
import { FormInstance } from "element-plus";

import * as ck from "../../util/verfication";

import link from "../../api/Link.js";
import apiUrl from "../../api/url.js";

import useMd5 from '../../hook/index'

import {useRouter} from 'vue-router'
let router = useRouter()

const MenuData = reactive([
  { txt: "登录", current: true, type: "login" },
  { txt: "注册", current: false, type: "register" },
]);

let model = ref("login");

const ruleForm = reactive({
  username: "",
  password: "",
  checkPsd: "",
});

let btnbool = ref(true);

watch(ruleForm,(newval,oldval)=>{
  if(model.value==="login"){
    if(newval.username!==""&&newval.password!==""){
      btnbool.value = false
    }else{
      btnbool.value = true
    }
  }else{
    if(newval.username!==""&&newval.password!==""&&newval.checkPsd!==""){
      btnbool.value = false
    }else{
      btnbool.value = true
    }
  }
})

let clickMenu = (item: any) => {
  MenuData.forEach((elemt) => {
    elemt.current = false;
  });

  item.current = true;

  // 修改保存点击的状态
  model.value = item.type;
};

onMounted(() => {
  console.log(process.env.VUE_APP_API);
});

// elementPlus表单部分
const ruleFormRef = ref<FormInstance>();

const checkUser = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("邮箱不能为空！！！"));
  } else if (ck.ckEmail(value)) {
    return callback(new Error("邮箱格式有误！！！"));
  } else {
    callback();
  }
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空！！！"));
  } else if (ck.ckPass(value)) {
    callback(new Error("密码格式有误！！！必须为6至15位的字母+数字。"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (model.value === "login") {
    callback();
  }

  if (value === "") {
    callback(new Error("重复密码不能为空！！！"));
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码必须相同！！！"));
  } else {
    callback();
  }
};

const rules = reactive({
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPsd: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: checkUser, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (model.value === "login") {
        console.log("登录");
        link(apiUrl.register,"GET",{},{name:ruleForm.username,psd:useMd5(ruleForm.password).value}).then((ok:any)=>{
          // console.log(ok)
          if(Object.keys(ok.data).length !== 0){
            ElMessage.success("登录成功")
            router.push('/home')
          }else{
            ElMessage.error("登录失败")
          }
        })
      } else {
        let data = {
          name: ruleForm.username,
          psd: useMd5(ruleForm.password).value,
        };
        link(apiUrl.register, "POST", data).then((ok: any) => {
          // console.log(ok);
          if (Object.keys(ok.data).length !== 0) {
            ElMessage.success("注册成功");
            model.value = "login";
            MenuData.forEach((v) => {
              v.current = false;
            });

            MenuData[0].current = true;
          } else {
            ElMessage.error("注册失败");
            return false;
          }
        });
      }
    } else {
      
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// elementPlus表单部分
</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.login {
  background-color: rgb(14, 110, 200);
  color: #fff;
  height: 100%;
}
.menu-tab {
  text-align: center;
  li {
    margin-top: 160px;
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(255, 255, 255, 0.5);
  }
}

.demo-ruleForm {
  width: 20%;
  margin: 60px auto;
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #fff;
  }
  .block {
    display: block;
    width: 60%;
    height: 40px;
    margin-left: 50%;
    transform: translate(-50%);
  }
  .login-btn {
    margin-top: 20px;
  }
}
</style>