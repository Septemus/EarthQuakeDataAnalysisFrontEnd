<template>
    <el-table :data="props.tableData" stripe :table-layout="'fixed'" :height="'100%'" :row-style="{ height: `${100/props.tableData.length}%` }">
        <el-table-column v-for="c in columns" :prop="c.prop" :label="c.label" />
    </el-table>
</template>
<script lang="ts" setup>
import { ElTable as ElTable, ElTableColumn } from "element-plus"
const props = defineProps<{ tableData: { [key: string]: number | string }[], columns: { prop: string, label: string }[] }>()
</script>
<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
    .el-table__body {
        height: 100%;
    }
    height: 100%;
}
</style>