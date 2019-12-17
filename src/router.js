import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import index from "./pages/index.vue";
import test from "./pages/test.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

const routes = [
    {
        path:"/index",
        component: index
    },	
	{
        path:"/test",
        component: test		
	},
    // 重定向
    {
        path: '/', 
        redirect: '/index' 
    }	
]

var router =  new VueRouter({
	// mode: 'history', // 打包的内容依赖服务器环境
	mode: 'hash', // 打包的内容不依赖服务器环境
    routes
})
export default router;