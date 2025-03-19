<template>
    <el-table :data="tableData" stripe :table-layout="'fixed'" :height="'100%'" :row-style="{height:'10%'}">
        <el-table-column prop="date" label="时间" />
        <el-table-column prop="name" label="地点" />
        <el-table-column prop="address" label="强度" />
    </el-table>
</template>
<script lang="ts" setup>
import {ElTable as ElTable,ElTableColumn} from "element-plus"
import { ref } from 'vue';
const tableData=ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
</script>
<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
    .el-table__body {
        height: 100%;
    }
    height: 100%;
}
</style>