import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUi from "element-ui";
import VueAxios from "vue-axios";
import config from "./api";
import "element-ui/lib/theme-chalk/index.css";
import "./registerServiceWorker";

// axios.create(config);
const bus = new Vue();

Vue.prototype.$bus = bus;

Vue.use(VueAxios, config);
Vue.use(ElementUi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
