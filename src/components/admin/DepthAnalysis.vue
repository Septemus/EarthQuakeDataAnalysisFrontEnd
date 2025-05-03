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
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'省份平均地震深度柱状图'" :height="500" :see-all="false">
        <ProvinceDepthAvgBar />
      </card-avg-chart>
    </div>
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'市级平均地震深度柱状图'" :height="500" :see-all="false">
        <CityDepthAvgBar />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震深度热力图'" :height="800" :see-all="false">
        <ChinaDepthHeatMap class="bg-blueGray-700"/>
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'每年平均地震深度折线变化图'" :height="400">
        <card-yearly-depth-avg-chart />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'每月平均地震深度折线变化图'" :height="400">
        <card-monthly-depth-avg-chart />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震深度排行榜'" :height="600">
        <depth-rank />
      </card-avg-chart>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import CardDepthLevel from "@/components/Cards/CardDepthLevel.vue";
import CardDepthFunnel from "@/components/Cards/CardDepthFunnel.vue";
import ProvinceDepthAvgBar from "@/components/Cards/ProvinceDepthAvgBar.vue";
import CityDepthAvgBar from "@/components/Cards/CityDepthAvgBar.vue"
import ChinaDepthHeatMap from "@/components/Maps/ChinaDepthHeatMap.vue"
import CardYearlyDepthAvgChart from "@/components/Cards/CardYearlyDepthAvgChart.vue";
import CardMonthlyDepthAvgChart from "@/components/Cards/CardMonthlyDepthAvgChart.vue";
import DepthRank from "@/components/Cards/DepthRank.vue";
</script>