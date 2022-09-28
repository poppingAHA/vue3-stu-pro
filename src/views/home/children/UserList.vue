<template>
  <div>
    <el-table :data="tableData.listData.slice((currentPage4-1)*pageSize4,currentPage4*pageSize4)" style="width: 100%">
      <el-table-column prop="id" label="编号"/>
      <el-table-column prop="title" label="楼盘名称" />
      <el-table-column prop="type" label="房源类型" />
      <el-table-column prop="num" label="门牌号" />
      <el-table-column prop="hometype" label="房源户型" />
      <el-table-column prop="name" label="户主"/>
      <el-table-column>
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入户主名称查询内容" @blur="searchLink"/>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="currentPage4"
      v-model:page-size="pageSize4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.listData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import link from '@/api/Link'
import apiUrl from '@/api/url'
import { ref,onMounted,reactive } from 'vue'

let search = ref("")
const currentPage4 = ref(1)
const pageSize4 = ref(20)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

let tableData = reactive({
  listData:[]
})

let searchLink = ()=>{
  link(apiUrl.userlist,"get",{},{name:search.value}).then((ok:any)=>{
    console.log(ok)
    tableData.listData=ok.data
  })
}

onMounted(()=>{
  link(apiUrl.userlist).then((ok:any)=>{
    console.log(ok)
    tableData.listData=ok.data
  })
})

</script>

<style>
</style>