<template>
    <my-table :columns="columns" :table-data="tableData" :is-loading="isLoading" :crud="crud" />
    <div class="demo-pagination-block">
        <div class="demonstration">修改条目数量/页</div>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
            layout="sizes, prev, pager, next" :total="total" @size-change="handlePageChange"
            @current-change="handlePageChange" />
    </div>
</template>
<script lang="ts" setup>
import MyTable from "@/components/Cards/Echarts/Table.vue"
import { ElPagination } from "element-plus"
import { computed, onMounted, ref } from "vue"
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref<Record[]>([])
const currentRange=computed<[number,number]>(()=>{
    return [(currentPage.value-1)*pageSize.value,(currentPage.value)*pageSize.value]
})
const props=defineProps<{columns:{prop:string,label:string,dateTime?:boolean}[],getData:(range?:[number,number])=>Promise<Record[]>,isLoading:boolean,total:number,crud:boolean}>()
interface Record {
    [key:string]:string|number
}

function handlePageChange() {
    props.getData(currentRange.value).then((res)=>{
        tableData.value=res;
    })
}
onMounted(() => {
    handlePageChange()
})
</script>