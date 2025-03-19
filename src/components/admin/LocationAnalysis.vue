<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4 content">
      <!-- <h2 class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">ehjejh</h2> -->
      <ChinaHeatMap class="relative w-full shadow-lg rounded bg-blueGray-700 "/>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震省份词云绘图'" :height="600" :see-all="true">
          <ProvinceWordCloud />
      </card-avg-chart>
    </div>
  </div>
</template>
<script lang="ts">
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import ChinaHeatMap from "../Maps/ChinaHeatMap.vue";
import ProvinceWordCloud from "@/components/Cards/ProvinceWordCloud.vue";
export default {
  components: {
    CardAvgChart,
    ChinaHeatMap,
    ProvinceWordCloud
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 800px;
}
</style>