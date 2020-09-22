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
    if (to.path == '/') {
        // 如果是去Login页面，则直接访问
        next();
    } else {
        // 如果已登录，则继续往下走
        if (window.sessionStorage.getItem('user')) {
            initMenus(router, store);
            next();
            // 如果未登录，则跳转至登录页面
        } else {
            next('/?redirect=' + to.path);
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
