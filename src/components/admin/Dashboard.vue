<template>
  <div>
    <router-link class="big-screen-sec" :to="'/big-screen'">
      <el-button type="primary" class="big-screen-bt">
        数据大屏
      </el-button>
    </router-link>
    <div class="flex flex-wrap">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-yearly-line-chart />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-avg-chart :title="'地震强度柱形图'" :height="350">
          <level-bar class="h-full w-full" />
        </card-avg-chart>
      </div>
    </div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <card-avg-chart :title="'地震省份词云绘图'" :height="600" :see-all="true">
          <word-cloud />
        </card-avg-chart>
      </div>
      <div class="w-full px-4">
        <card-avg-chart :title="'地震强度排行榜'" :height="600" :see-all="true">
          <levelRank></levelRank>
        </card-avg-chart>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ElButton } from "element-plus";
import CardYearlyLineChart from "@/components/Cards/CardYearlyLineChart.vue";
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import WordCloud from "@/components/Cards/ProvinceWordCloud.vue";
import levelRank from "@/components/Cards/levelRank.vue";
import LevelBar from "@/components/Cards/LevelBar.vue";
export default {
  name: "dashboard-page",
  components: {
    CardYearlyLineChart,
    CardAvgChart,
    WordCloud,
    LevelBar,
    levelRank,
    ElButton
  },
};
</script>
<style lang="scss" scoped>
.big-screen-sec {
  width: 100%;
  z-index: 9;
  padding: 0 1rem;
  box-sizing: border-box;
  position: relative;
  .big-screen-bt {
    width: 100%;
    height: 200px;
    font-size: 64px;
  }
}
</style>