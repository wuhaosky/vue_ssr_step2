"use strict";

// Vue和Vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用vue-router
Vue.use(VueRouter);

// 路由映射
const routers = [{
    path: '/',
    name: 'corepage',
    meta: {title: "主页面"},
    component: require('../container/corepage.vue')
}, {
    path: '/routerpage1',
    name: 'routerpage1',
    meta: {title: "路由页面1"},
    component: require('../container/routerpage1.vue')
}, {
    path: '/routerpage2',
    name: 'routerpage2',
    meta: {title: "路由页面2"},
    component: require('../container/routerpage2.vue')
}, {
    path: '/routerpage3',
    component: require('../container/routerpage3entry.vue'),
    children: [{
        path: '/',
        name: 'routerpage3',
        meta: {title: "路由页面3"},
        component: require('../container/routerpage3.vue')
    }, {
        path: 'nestedrouter1',
        name: 'nestedrouter1',
        meta: {title: "嵌套路由1"},
        component: require('../container/nestedrouter1.vue') 
    }, {
        path: 'nestedrouter2',
        name: 'nestedrouter2',
        meta: {title: "嵌套路由2"},
        component: require('../container/nestedrouter2.vue') 
    }]
}];

/**
 * router工厂函数
 * 
 * @export
 * @returns router实例
 */
export function createRouter(){
    // VueRouter实例
    const router = new VueRouter({
        mode: 'history',
        routes: routers
    });
    // // 路由全局钩子
    // router.afterEach(route => {
    //     // 设置每个路由页面的title
    //     if(route.meta.title){
    //         document.title = route.meta.title;
	//     }
    // });
    return router;
}
