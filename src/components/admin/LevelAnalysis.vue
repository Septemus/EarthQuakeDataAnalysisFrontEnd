<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'省份平均地震强度柱状图'" :height="500" :see-all="false">
        <ProvinceLevelAvgBar />
      </card-avg-chart>
    </div>
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'市级平均地震强度柱状图'" :height="500" :see-all="false">
        <CityLevelAvgBar />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'每年平均地震强度折线变化图'" :height="400">
        <card-yearly-avg-chart />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'每年平均地震强度折线变化图'" :height="400">
        <card-monthly-avg-chart />
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
import CardMonthlyAvgChart from "@/components/Cards/CardMonthlyAvgChart.vue";
import ProvinceLevelAvgBar from "@/components/Cards/ProvinceLevelAvgBar.vue";
import CityLevelAvgBar from "@/components/Cards/CityLevelAvgBar.vue";
</script>
