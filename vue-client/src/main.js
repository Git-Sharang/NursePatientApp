import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from "vue-cookies";
import moment from "moment";
import VueMeta from "vue-meta";
import _ from "lodash";
import LazyYoutube from "vue-lazytube";

Vue.use(LazyYoutube);

Vue.use(VueMeta);
Vue.use(_);

Vue.prototype.moment = moment;

Vue.use(Cookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
