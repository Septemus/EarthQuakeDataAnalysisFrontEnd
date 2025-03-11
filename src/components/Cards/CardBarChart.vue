<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            地震强度柱形图
          </h6>
          <h2 class="text-blueGray-700 text-xl font-semibold">
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative h-350-px">
        <Bar class="h-full w-full"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Bar from './Echarts/Bar.vue';
</script>
