<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4 content">
      <!-- <h2 class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">ehjejh</h2> -->
      <ChinaHeatMap class="relative w-full shadow-lg rounded bg-blueGray-700 " />
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震省份词云绘图'" :height="600" :see-all="true">
        <ProvinceWordCloud />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震市级词云绘图'" :height="900" :see-all="true">
        <CityWordCloud />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震数量省份饼状图'" :height="900" :see-all="false">
        <ProvincePie />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震数量市级饼状图'" :height="900" :see-all="false">
        <CityPie />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'大陆与海洋地震数量比例饼状图'" :height="900" :see-all="false">
        <ContinentSeaPie />
      </card-avg-chart>
    </div>
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'地震数量省份柱状图'" :height="500" :see-all="false">
        <ProvinceCountBar />
      </card-avg-chart>
    </div>
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'地震数量市级柱状图'" :height="500" :see-all="false">
        <CityCountBar />
      </card-avg-chart>
    </div>
  </div>
</template>
<script lang="ts">
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import ChinaHeatMap from "../Maps/ChinaHeatMap.vue";
import ProvinceWordCloud from "@/components/Cards/ProvinceWordCloud.vue";
import CityWordCloud from "@/components/Cards/CityWordCloud.vue";
import ProvincePie from "@/components/Cards/ProvincePie.vue";
import CityPie from "@/components/Cards/CityPie.vue";
import ProvinceCountBar from "@/components/Cards/ProvinceCountBar.vue";
import CityCountBar from "@/components/Cards/CityCountBar.vue";
import ContinentSeaPie from "@/components/Cards/ContinentSeaPie.vue";
export default {
  components: {
    CardAvgChart,
    ChinaHeatMap,
    ProvinceWordCloud,
    CityWordCloud,
    ProvincePie,
    CityPie,
    ProvinceCountBar,
    CityCountBar,
    ContinentSeaPie
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 800px;
}
</style>