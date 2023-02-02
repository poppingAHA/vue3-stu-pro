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
  background-color: rgb(50, 77, 69);
}
.el-header{
  background-color: rgb(54, 99, 84);
}
.el-main{
  background-color: rgb(189, 207, 202);
}
</style>