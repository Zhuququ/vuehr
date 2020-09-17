import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用插件的形式，将常用的方法绑定到Vue中
import {deleteRequest, getRequest, postKeyValueRequest, postRequest, putRequest} from "./utils/api";
import {initMenus} from "./utils/menuUtils";

import 'font-awesome/css/font-awesome.min.css';

Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

Vue.config.productionTip = false;

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
    console.log(to);
  if (to.path == '/') {
    // 如果是去Login页面
    next();
  } else {
    initMenus(router, store);
    next();
  }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
