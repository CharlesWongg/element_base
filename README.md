# element_base
elementUI基本版

##### 技术栈：Vue + ElementUI

#### 1.HBuilderX 创建一个基于ElementUI的项目
![](https://raw.githubusercontent.com/CharlesWongg/mobile_forward/master/D17AD9F879643B4C51EBC647BD5CCDB7.jpg)

`注意`:这个新建的项目需要按装 `babel-cli`, `babel-preset-es2015`;不然打包项目的时候会有问题。
`不识别es6的扩展运算符` 
```
npm install babel-plugin-transform-object-rest-spread -D
```

#### 2.按装  `babel-cli`, `babel-preset-es2015` 
```
npm i babel-cli babel-preset-es2015 -D
```
在根目录创建 .babelrc 文件,内容如下：
```javascript
{
    "presets": [
        "es2015"
    ],
    "plugins": [
        "transform-object-rest-spread"
    ] 
}
```
![](https://raw.githubusercontent.com/CharlesWongg/mobile_forward/master/DA885772DD4145CA590BC0A5513A6400.jpg)

#### 3.按装 vue-router
```
npm i vue-router -S
```
在/src/ 创建 router.js 文件
在/src/ 创建 pages 目录
在/src /pages/ 创建 index.vue  test.vue
```javascript
// /src/router.js
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
```
在 /src/main.js 引入 router
```javascript
// /src/main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 引入路由
import router from "./router.js" 

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```
修改 / src/App.vue
```vue
<!--/src/App.vue-->
<template>
  <div id="app">
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
```
给 /src/pages/index.vue 添加内空
给 /src/pages/test.vue 添加内空
npm run dev 测试一下程序
```vue
<!--/src/pages/index.vue-->
<template>
    <div>
        <el-button>{{ msg }}</el-button>
        <router-link to="/test">Go to test</router-link>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: "我是index 页面"
            }
        }       
    }
</script>

<style>
</style>

<!--/src/pages/test.vue-->
<template>
    <div>
        <router-link to="/index">Go to index</router-link>
    </div>
</template>

<script>
</script>

<style>
</style>
```
![](https://raw.githubusercontent.com/CharlesWongg/mobile_forward/master/3F5CAB41BF9BB3669E3247DB9572A767.jpg)
![](https://raw.githubusercontent.com/CharlesWongg/mobile_forward/master/A63C03ACEDF864136FDEF65C262A0026.jpg)
如图 程序正常运行

#### 4.安装 sass-loader  node-sass
```
npm i sass-loader@7.3.1 node-sass -D
```
`注意：我的环境安装最新的sass-loader 会报错`

修改 webpack.config.js的modules
```javascript
// webpack.config.js
modules: {
    rules: [{
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
          },
          {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: "sass-loader" // 将 Sass 编译成 CSS
          }
        ]    
    }]
}
```

#### 5.引入 vuex
```
npm i vuex -S
```
![](https://raw.githubusercontent.com/CharlesWongg/mobile_forward/master/D7B9D0ED88975FAC53D855589E86B21D.jpg)
在 /src/ 下创建 store 目录
在 /src/store/ 下创建 index.js
```javascript
// /src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        colorIndex: 0,
        colorList: ['#FF0000','#00FF00','#0000FF']
    },
    // 修改store中的值唯一的方法就是提交mutation来修改
    mutations: {
        setColorIndex(state,index){
            state.colorIndex = index
        }
    },
    // Getter相当于vue中的computed计算属性，
    // getter 的返回值会根据它的依赖被缓存起来，
    // 且只有当它的依赖值发生了改变才会被重新计算，
    // 这里我们可以通过定义vuex的Getter来获取，
    // Getters 可以用于监听、state中的值的变化，返回计算后的结果
    getters:{
        currentColor(state){
            return state.colorList[state.colorIndex]
        }
    },
    // 在actions中提交mutation再去修改状态值
    actions: {
        setColorIndexFn(context, index) {
            context.commit('setColorIndex', index)
        }
    }
})

export default store
```
在 /src/main.js 引入 /src/store/index.js
```
// src/store/index.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
// 引入路由
import router from "./router.js" 
import store from './store'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

通过 `mapState`、`mapGetters`、`mapActions` 使用 vuex
```vue
<!--/src/pages/index.vue-->
<template>
    <div>
        <el-button>{{ msg }}</el-button>
        <router-link to="/test">Go to test!</router-link>
        <p :style="{color: color}">测试 vuex</p>
        <p>切换颜色：</p>
        <div class="choose-color" @click="chooseColor">
            <div :style="{'background-color': colorArr[i]}" :data-idx="i" class="btn cc" v-for="(item, i) in colorArr" :key="i">{{colorArr[i]}}</div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    export default {
        data () {
            return {
                msg: "我是index 页面"
            }
        },
        computed: {
            ...mapState({
                colorIdx: 'colorIndex',
                colorArr: 'colorList'
            }),     
            ...mapGetters({
                color: 'currentColor'
            })
        },
        mounted() {
        },
        methods: {
            ...mapActions(['setColorIndexFn']),
            // 使用事件委托
            chooseColor(e) {
                let classList = [].slice.call(e.target.classList);
                if(~classList.indexOf('btn')) {
                    var idx = e.target.dataset.idx;
                    this.setColorIndexFn(idx);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .choose-color {
        display: flex;
        justify-content: center;
        .btn {
            padding: 12px 24px;
            border: 1px #c5c5c5 solid;
            width: 80px;
            margin: 0 12px;
            color: #fff;
        }       
    }
</style>
```
安装`autoprefixer` `es6-promise`
```
npm install postcss es6-promise autoprefixer
```
