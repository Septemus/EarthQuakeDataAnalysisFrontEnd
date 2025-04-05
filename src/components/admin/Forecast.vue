<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
            <card-avg-chart :title="'2025年6月-2026年6月预测情况'" :height="500" :see-all="false">
                <forecast-map />
            </card-avg-chart>
        </div>
    </div>
</template>
<script lang="ts" setup>
import CardAvgChart from "@/components/Cards/CardAvgChart.vue";
import ForecastMap from "@/components/Maps/ForecastMap.vue";
</script>