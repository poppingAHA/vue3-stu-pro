<template>
    <el-dialog v-model="$store.state.HomeModule.deleteDialogVisible" title="删除数据">
        确定删除该条数据吗？
        <template #footer>
            <span class="dialog-footer" @click="injectReload">
                <el-button @click="closeDialog(0)">取消</el-button>
                <el-button type="primary" @click="closeDialog(1)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { useStore } from "vuex";
import { inject } from 'vue';
const injectReload = inject("reload");
let store = useStore();

let closeDialog = (num: Number) => {
    store.commit("DELETEDIALOG");
    if (num === 1) {
        let row = store.state.HomeModule.deleteData;
        store.dispatch("DEL_DATA", row);
    }
};
</script>