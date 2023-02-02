<template>
  <div>
    <el-table :data="
      $store.state.HomeModule.listdata.slice(
        (currentPage4 - 1) * pageSize4,
        currentPage4 * pageSize4
      )
    " style="width: 100%">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="title" label="楼盘名称" />
      <el-table-column prop="type" label="房源类型" />
      <el-table-column prop="num" label="门牌号" />
      <el-table-column prop="hometype" label="房源户型" />
      <el-table-column prop="name" label="户主" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
      layout="total, sizes, prev, pager, next, jumper" :total="$store.state.HomeModule.listdata.length"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <!-- 修改的弹出框 -->
    <UpdateDialog></UpdateDialog> 

    <!-- 删除的弹出框 -->
    <DeleteDialog></DeleteDialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import link from "@/api/Link";
import apiUrl from "@/api/url";
import { ref, onMounted, reactive,inject} from "vue";
import UpdateDialog from "../../../components/UpdateDialog.vue";
import DeleteDialog from '@/components/DeleteDialog.vue';
import { useStore } from 'vuex'

let store = useStore()

let search = ref("");
const currentPage4 = ref(1);
const pageSize4 = ref(19);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  // console.log(index, row);
  store.commit("SET_DIALOG", row);
};
const handleDelete = (index: number, row: User) => {
  // console.log(index, row);
  // store.dispatch("DEL_DATA", row)
  store.commit("SET_DELETEDIALOG",row);
};
const injectReload = inject("reload");
let tableData = reactive({
  listData: [],
});

onMounted(() => {
  store.dispatch("USERUPDATE_LIST")
});
</script>

<style>

</style>