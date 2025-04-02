<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震深度与地震强度散点图'" :height="600" :see-all="false">
        <card-depth-level />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震深度管道图'" :height="500" :see-all="false">
        <CardDepthFunnel />
      </card-avg-chart>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import CardDepthLevel from "@/components/Cards/CardDepthLevel.vue";
import CardDepthFunnel from "@/components/Cards/CardDepthFunnel.vue";
</script>