<template>
    <my-table :columns="columns" :table-data="tableData" :is-loading="isLoading" :crud="true" />
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
const total=ref(0);
const currentRange=computed<[number,number]>(()=>{
    return [(currentPage.value-1)*pageSize.value,(currentPage.value)*pageSize.value]
})
const columns = [
    {
        prop: 'occurtime',
        label: '时间',
        dateTime: true
    },
    {
        prop: 'location',
        label: '地点',
    },
    {
        prop: 'logitude',
        label: '经度',
    },
    {
        prop: 'latitude',
        label: '纬度',
    },
    {
        prop: 'level',
        label: '强度',
    },
    {
        prop: 'depth',
        label: '深度',
    }
]
interface Record {
    occurTime: string
    depth: number
    level: number
    location: string
}
const isLoading = ref(true)
function getData(range?: [number, number]) {
    isLoading.value=true
    return fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/`, {
        headers: {
            "ngrok-skip-browser-warning": "true",
        },
    })
        .then(res => res.json())
        .then((res: Record[]) => {
            total.value=res.length
            console.log(res)
            // tableData.value = res
            isLoading.value = false
            if(range) {
                return res.slice(range[0],range[1])
            }
            else {
                return res;
            }
        })
}
function handlePageChange() {
    getData(currentRange.value).then((res)=>{
        tableData.value=res;
    })
}
onMounted(() => {
    handlePageChange()
})
</script>