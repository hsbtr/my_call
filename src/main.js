import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import VueAxios from "vue-axios";
import jsonp from "vue-jsonp";
import BaiDuMap from "vue-baidu-map";
import VueAmap from "vue-amap";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import config from "./api";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";

// axios.create(config);
const bus = new Vue();

Vue.prototype.$bus = bus;

Vue.use(VueAxios, config);
Vue.use(ElementUi);
Vue.use(jsonp);
Vue.use(BaiDuMap, {
  ak: "nVVsFYVag5znR8LDG1aGsUlChDaInUy8"
});
Vue.use(VueAmap);
VueAmap.initAMapApiLoader({
  key: "42ed4672eaf3df3fd7808ee250d6f114",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geolocation"
  ],
  uiVersion: "1.0.11",
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.4"
});
lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  // eslint-disable-next-line no-undef
  this.map = new AMap.Map("amapContainer", {
    // eslint-disable-next-line no-undef
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
