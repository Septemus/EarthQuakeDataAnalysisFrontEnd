<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-yearly-line-chart />
    </div>
    <div class="w-full mb-12 px-4">
      <card-monthly-line-chart />
    </div>
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'月份分析'" :height="400" :see-all="false">
        <MonthPie />
      </card-avg-chart>
    </div>
    <div class="w-full xl:w-6/12 mb-12 px-4">
      <card-avg-chart :title="'季节性分析'" :height="400" :see-all="false">
        <SeasonPie />
      </card-avg-chart>
    </div>
    <div class="w-full mb-12 px-4">
      <card-avg-chart :title="'地震最多的省份随时间变化'" :height="600" :see-all="false">
        <ProvinceBarRace />
      </card-avg-chart>
    </div>
    <div class="w-full  mb-12 px-4">
      <card-avg-chart :title="'地震最多的市随时间变化'" :height="600" :see-all="false">
      </card-avg-chart>
    </div>
  </div>
</template>
<script lang="ts">
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import CardYearlyLineChart from "@/components/Cards/CardYearlyLineChart.vue";
import CardMonthlyLineChart from "@/components/Cards/CardMonthlyLineChart.vue";
import SeasonPie from "@/components/Cards/SeasonPie.vue";
import MonthPie from "@/components/Cards/MonthPie.vue";
import ProvinceBarRace from "@/components/Cards/ProvinceBarRace.vue";
export default {
  components: {
    CardAvgChart,
    CardYearlyLineChart,
    CardMonthlyLineChart,
    SeasonPie,
    MonthPie,
    ProvinceBarRace
  },
};
</script>
