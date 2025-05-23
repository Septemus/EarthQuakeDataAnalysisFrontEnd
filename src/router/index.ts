import { createRouter, createWebHashHistory } from 'vue-router'

// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'
import Admin from "@/components/layouts/Admin.vue";

// views for Admin layout

import Dashboard from "@/components/admin/Dashboard.vue";
import LocationAnalysis from "@/components/admin/LocationAnalysis.vue";
import TimeAnalysis from "@/components/admin/TimeAnalysis.vue";
import LevelAnalysis from "@/components/admin/LevelAnalysis.vue";
import DepthAnalysisVue from '@/components/admin/DepthAnalysis.vue';
import ForecastVue from '@/components/admin/Forecast.vue';
import BigScreenVue from '@/components/big-screen/index.vue'


const routes = [
  {
    path:"/big-screen",
    component:BigScreenVue,
  },
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/location-analysis",
        component: LocationAnalysis,
      },
      {
        path: "/admin/time-analysis",
        component: TimeAnalysis,
      },
      {
        path: "/admin/level-analysis",
        component: LevelAnalysis,
      },
      {
        path: "/admin/depth-analysis",
        component: DepthAnalysisVue,
      },
      {
        path: "/admin/forecast",
        component: ForecastVue,
      },
    ],
  },
];

export default createRouter({
  history:createWebHashHistory(),
  routes,
})