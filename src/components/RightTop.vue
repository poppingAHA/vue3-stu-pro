<template>
  <div>
    <el-icon @click="ck">
      <CaretLeft v-if="$store.state.HomeModule.navBool" />
      <CaretRight v-else />
    </el-icon>
    <span class="user-name" v-if="user">{{ user.data.name }}
      <el-button @click="logoutHandle">退出</el-button>
    </span>
  </div>
</template>

<script setup>
import { CaretLeft, CaretRight } from "@element-plus/icons-vue";
import { useStore, mapState, mapMutations } from 'vuex'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
let store = useStore();
let router = useRouter();
const user = reactive({});
user.data = JSON.parse(localStorage.getItem("muser"));
let ck = () => {
  store.commit("SET_NAV_BOOL")
  console.log("被点击")
}
let logoutHandle = () => {
  store.commit("UserModule/setUser", { name: "", psd: "", token: "" });
  localStorage.removeItem("muser");
  router.push("/login")
}
</script>

<style lang="scss">
.el-header {
  line-height: 70px;
  cursor: pointer;

  .el-icon {
    font-size: 20px;
  }

  .user-name {
    color: #fff;
    float: right;

    .el-button {
      margin-left: 5px;
      background-color: #6cc490;
      border-color: #75d1b4;
      color: #fff;
    }

    .el-button:focus,
    .el-button:hover {
      background-color: #60ae80;
      border-color: #63b199;
      color: rgb(208, 245, 227);
    }
  }
}
</style>