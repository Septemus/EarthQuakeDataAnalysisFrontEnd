<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="总地震次数" :statTitle="total_count.toString()" statIconName="far fa-chart-bar"
              statIconColor="bg-red-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="平均地震级数" :statTitle="average_level.toFixed(3)" statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="平均地震深度" :statTitle="`${average_depth.toFixed(3)} km`" statIconName="fas fa-users"
              statIconColor="bg-pink-500" />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats statSubtitle="本月地震次数" :statTitle="recent_month_count.toString()" statIconName="fas fa-percent"
              statIconColor="bg-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CardStats from "@/components/Cards/CardStats.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    CardStats,
  },
  data() {
    return {
      total_count: 0,
      average_level: 0,
      average_depth: 0,
      recent_month_count: 0
    }
  },
  mounted() {
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/total_count`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((res) =>res.json()).then((res) => {
        this.total_count = res.data
      })
    fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/average_level`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }).then((res) =>res.json()).then((res) => {
        this.average_level = res.data
      })
      fetch(`${import.meta.env.VITE_HOST_NAME}/earthquake/api/average_depth`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }).then((res) =>res.json()).then((res) => {
        this.average_depth = res.data
      })
      fetch("https://api.shwgij.com/api/dizhen/dizhen?key=PYX8PGJxHQUOP3Etd0LBMqPyJA&num=4")
      .then((res) =>res.json()).then((res) => {
        this.recent_month_count = res.data.shuju.length
      })

  },
})
</script>
