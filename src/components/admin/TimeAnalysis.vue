<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-yearly-line-chart />
    </div>
    <div class="w-full mb-12 px-4">
    </div>
  </div>
</template>
<script lang="ts">
import CardYearlyLineChart from "@/components/Cards/CardYearlyLineChart.vue";
export default {
  components: {
    CardYearlyLineChart
  },
};
</script>
