<template>
  <WordCloud :size-range="sizeRangeTyped" :data="data" :is-loading="isLoading" class="" />
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import WordCloud from './Echarts/WordCloud.vue';
const data = ref<{ name: string, value: number }[]>([])
const isLoading = ref<boolean>(true)
const props = defineProps({
  sizeRange: {
    type: Array,
    default: [20, 200]
  }
})
const sizeRangeTyped = computed((): [number, number] => {
  return props.sizeRange as [number,number]
})
onMounted(() => {
  fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/locationly_count`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const tmp = Object.entries(res).map((e: any) => {
        let name = e[0];
        if (name === "新疆维吾尔自治区") {
          name = "新疆"
        }
        return {
          name,
          value: e[1],
        };
      });
      data.value = tmp
      isLoading.value = false;
    });
})
</script>