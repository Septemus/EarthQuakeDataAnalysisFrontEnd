<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-yearly-line-chart />
    </div>
    <div class="w-full mb-12 px-4">
      <card-monthly-line-chart />
    </div>
  </div>
</template>
<script lang="ts">
import CardYearlyLineChart from "@/components/Cards/CardYearlyLineChart.vue";
import CardMonthlyLineChart from "@/components/Cards/CardMonthlyLineChart.vue";
export default {
  components: {
    CardYearlyLineChart,
    CardMonthlyLineChart
  },
};
</script>
