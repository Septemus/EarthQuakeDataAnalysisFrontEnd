<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'每年平均地震强度折线变化图'" :height="400">
        <card-yearly-avg-chart />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震强度柱形图'" :height="350">
        <level-bar class="h-full w-full" />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震强度排行榜'" :height="600" :see-all="true">
        <levelRank></levelRank>
      </card-avg-chart>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import LevelBar from "@/components/Cards/LevelBar.vue";
import levelRank from "@/components/Cards/levelRank.vue";
import CardYearlyAvgChart from "@/components/Cards/CardYearlyAvgChart.vue";
</script>
