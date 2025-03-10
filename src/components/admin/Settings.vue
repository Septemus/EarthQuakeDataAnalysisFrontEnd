<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full px-4 content">
      <!-- <h2 class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">ehjejh</h2> -->
      <ChinaHeatMap class="relative w-full shadow-lg rounded bg-blueGray-700 "/>
    </div>
  </div>
</template>
<script lang="ts">
import ChinaHeatMap from "../Maps/ChinaHeatMap.vue";

export default {
  components: {
    ChinaHeatMap
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 800px;
}
</style>