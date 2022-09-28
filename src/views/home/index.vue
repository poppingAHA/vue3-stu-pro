<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <Lm/>
      </el-aside>
      <el-container>
        <el-header>
          <Rm/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Lm from "../../components/LeftMenu.vue"
import Rm from "../../components/RightTop.vue"
</script>

<style>
html,body,#app,.common-layout,.el-aside,.el-container{
  height: 100%;
}
.el-aside{
  background-color: #545c64;
}
.el-header{
  /* background-color: aqua; */
}
.el-main{
  background-color: gainsboro;
}
</style>