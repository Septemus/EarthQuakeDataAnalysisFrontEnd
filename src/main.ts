import { createApp } from "vue";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";
import 'echarts-wordcloud'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from "./App.vue";
import router from "./router";
createApp(App).use(router).use(ElementPlus).mount("#app");
