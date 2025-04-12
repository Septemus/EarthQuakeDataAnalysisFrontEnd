<template>
  <div
    class="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-lg rounded"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
            {{ props.title }}
          </h6>
        </div>
        <div
          class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
        >
          <button
            class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            v-if="seeAll"
          >
            See all
          </button>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <div class="relative" :style="{height:`${height}${unit}`}">
         <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import Bar from './Echarts/Bar.vue';
const props=defineProps({
  height:{
    type:Number,
    default:350
  },
  unit:{
    type:String,
    default:"px"
  },
  title:{
    type:String,
    required:true
  },
  seeAll:{
    type:Boolean,
    default:false
  }
})
</script>
