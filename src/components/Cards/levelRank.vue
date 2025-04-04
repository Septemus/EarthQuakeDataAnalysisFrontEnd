<template>
  <my-table :table-data="tableData" :columns="columns" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import MyTable from "@/components/Cards/Echarts/Table.vue";
const columns = [
  {
    prop: 'occurtime',
    label: '时间',
  },
  {
    prop: 'location',
    label: '地点',
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
onMounted(() => {
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/?orderby=level&limit=10`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then(res => res.json())
    .then((res: Record[]) => {
      console.log(res)
      tableData.value = res
    })
})
const tableData = ref<Record[]>([])
</script>
<style lang="scss" scoped></style>