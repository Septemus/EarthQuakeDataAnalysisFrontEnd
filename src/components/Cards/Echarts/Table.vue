<template>
    <div class="my-table">
        <el-table v-loading="isLoading" :data="filteredData" stripe :table-layout="'fixed'" :height="'100%'"
            :row-style="{ height: `${100 / filteredData.length}%` }">
            <el-table-column v-for="c in columns" :prop="c.prop" :label="c.label" />
            <el-table-column :align="'right'" v-if="crud">
                <template #header>
                    <el-button size="small" @click="handleAdd">
                        增加
                    </el-button>
                </template>
                <template #default="scope" v-if="crud">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
            <el-form :model="modalData" label-width="auto" style="max-width: 600px">
                <el-form-item v-for="c in props.columns" :label="c.label">
                    <el-date-picker v-if="c.dateTime" :type="'datetime'" v-model="modalData[c.prop]"
                        placeholder="Pick a Date" />
                    <el-input v-else v-model="modalData[c.prop]"
                        :type="typeof modalData[c.prop] === 'string' ? 'text' : 'number'"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { ElTable as ElTable, ElTableColumn, ElInput, ElButton, ElDialog, ElForm, ElFormItem, ElDatePicker } from "element-plus"
import { computed, ref } from "vue";
type Row = { [key: string]: number | string }
const modalData = ref<Row & { opr: "editing" | "creating" }>({ opr: "editing" })
const props = defineProps<{ tableData: Row[], columns: { prop: string, label: string, dateTime?: boolean }[], crud?: boolean, isLoading?: boolean, keyword?: string }>()
const dialogVisible = ref(false)
const filteredData = computed(() => {
    if (props.keyword) {
        return props.tableData.filter(t => {
            for (const c of props.columns) {
                if (t[c.prop].toString().includes(props.keyword!)) {
                    return true;
                }
            }
            return false;
        })
    }
    else {
        return props.tableData;
    }
})
const handleEdit = (index: number, row: Row) => {
    index;
    dialogVisible.value = true;
    modalData.value = { ...row, opr: "editing" };
}
const handleAdd = () => {
    dialogVisible.value = true;
    modalData.value = {opr:"creating"};
    for (const c of props.columns) {
        modalData.value[c.prop] = ""
    }
}
const handleDelete = (index: number, row: Row) => {
    console.log("deleting",index,row)
}
const handleClose = () => {
    dialogVisible.value = false
}
const handleSubmit=()=>{
    
    handleClose();
}
</script>
<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
    .el-table__body {
        height: 100%;
    }

    height: 100%;
}
</style>