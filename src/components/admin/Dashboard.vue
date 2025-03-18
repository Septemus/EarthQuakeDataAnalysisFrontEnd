<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-bar-chart />
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <word-cloud />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <top-earth-quakes />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import WordCloud from "@/components/Cards/WordCloud.vue";
import TopEarthQuakes from "@/components/Cards/TopEarthQuakes.vue";
export default {
  name: "dashboard-page",
  components: {
    CardLineChart,
    CardBarChart,
    WordCloud,
    TopEarthQuakes,
  },
};
</script>
