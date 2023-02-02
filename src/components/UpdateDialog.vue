<template>
  <el-dialog v-model="$store.state.HomeModule.dialogFormVisible" title="编辑数据">
    <el-form :model="form">
      <el-form-item label="楼盘名称" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源类型" :label-width="formLabelWidth">
        <el-input v-model="form.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="门牌号" :label-width="formLabelWidth">
        <el-input v-model="form.num" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房源户型" :label-width="formLabelWidth">
        <el-input v-model="form.hometype" autocomplete="off" />
      </el-form-item>
      <el-form-item label="户主" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" @click="injectReload">
        <el-button @click="closeDialog(0)">取消</el-button>
        <el-button type="primary" @click="closeDialog(1)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, inject } from "vue";
import { useStore } from "vuex";
import link from "../api/Link";
import url from "../api/url";
let store = useStore();
// const dialogFormVisible = ref(false)
const formLabelWidth = "140px";

const form = reactive({
  title: "",
  type: "",
  num: "",
  hometype: "",
  name: "",
});

const injectReload = inject("reload");

let closeDialog = (num: Number) => {
  store.commit("DIALOG");
  if (num === 1) {
    let data = {
      title: form.title,
      type: form.type,
      num: form.num,
      hometype: form.hometype,
      name: form.name,
    };
    link(
      url.userlist + "/" + store.state.HomeModule.uplistData.id,
      "PUT",
      data
    ).then((ok: any) => {
      console.log(ok);
      // window.location.reload()
    });
  }
};
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 400px;
}

.el-input {
  width: 400px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>