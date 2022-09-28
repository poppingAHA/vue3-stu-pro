<template>
  <div>
    <el-icon @click="ck"><CaretLeft v-if="$store.state.HomeModule.navBool"/><CaretRight v-else/></el-icon>
  </div>
</template>

<script setup>
import {CaretLeft,CaretRight} from "@element-plus/icons-vue";
import {useStore} from 'vuex'
import {ref} from 'vue'
// let btnbool = ref(true)
let store = useStore()
let ck=()=>{
  store.commit("SET_NAV_BOOL")
  console.log("被点击")
}
</script>

<style lang="scss">
.el-header{
  line-height: 70px;
  cursor: pointer;
  .el-icon{
    font-size: 20px;
  }
}
</style>