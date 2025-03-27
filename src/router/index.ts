import { createRouter, createWebHashHistory } from 'vue-router'

// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'
import ChinaHeatMap from '../components/Maps/ChinaHeatMap.vue'
import Admin from "@/components/layouts/Admin.vue";

// views for Admin layout

import Dashboard from "@/components/admin/Dashboard.vue";
import LocationAnalysis from "@/components/admin/LocationAnalysis.vue";
import TimeAnalysis from "@/components/admin/TimeAnalysis.vue";
import Maps from "@/components/admin/Maps.vue";

const routes = [
  { path: '/home', component: ChinaHeatMap },
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
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/home" },
];

export default createRouter({
  history:createWebHashHistory(),
  routes,
})