import { createRouter, createWebHashHistory } from 'vue-router'

// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'
import ChinaHeatMap from '../components/Maps/ChinaHeatMap.vue'
import Admin from "@/components/layouts/Admin.vue";

// views for Admin layout

import Dashboard from "@/components/admin/Dashboard.vue";
import Settings from "@/components/admin/Settings.vue";
import Tables from "@/components/admin/Tables.vue";
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
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
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