"use strict";

// Vue
import Vue from "vue";
// 引入store和router的工厂函数
import {createStore} from './store/store.js'
import {createRouter} from './router/router.js'

// 引入同步路由状态到store库
import {sync} from 'vuex-router-sync'

// 引入样式
// import './index.less';

// 根vue component
import App from './app.vue'

// vue实例工厂函数
export function createApp() {

    const store = createStore();
    const router = createRouter();

    // 同步路由状态到store库
    sync(store, router);

    const app = new Vue({
        store,
        router,
        render: h => h(App)
    });
    return {
        app,
        store,
        router
    };
}

