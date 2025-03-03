import { createRouter, createWebHashHistory } from 'vue-router'

// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'
import Home from '../components/Home.vue'

const routes = [
  { path: '/home', component: Home },
]

export default createRouter({
  history:createWebHashHistory(),
  routes,
})