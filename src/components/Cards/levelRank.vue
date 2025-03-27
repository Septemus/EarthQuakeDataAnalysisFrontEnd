<template>
    <el-table :data="tableData" stripe :table-layout="'fixed'" :height="'100%'" :row-style="{height:'10%'}">
        <el-table-column prop="occurTime" label="时间" />
        <el-table-column prop="location" label="地点" />
        <el-table-column prop="level" label="强度" />
        <el-table-column prop="depth" label="深度" />
    </el-table>
</template>
<script lang="ts" setup>
import {ElTable as ElTable,ElTableColumn} from "element-plus"
import { onMounted, ref } from 'vue';
interface Record{
  occurTime:string
  depth:number
  level:number
  location:string
}
onMounted(()=>{
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/?orderby=level&limit=10`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
  .then(res=>res.json())
  .then((res:Record[])=>{
    console.log(res)
    tableData.value=res
  })
})
const tableData=ref<Record[]>([])
</script>
<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
    .el-table__body {
        height: 100%;
    }
    height: 100%;
}
</style>