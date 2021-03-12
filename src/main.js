import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入 Nprogress 对应的JS和CSS
import NProgress from "nprogress"
import "nprogress/nprogress.css"

// 导入全局样式表
import './assets/css/global.css'

// 导入 axios 
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://120.53.120.229:8888/api/private/v1/'
// axios 请求拦截
axios.interceptors.request.use(config => {
    // 添加 进度条
    NProgress.start()
    // 为请求头对象，添加 Token 验证的 Authorization 字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // 在最后必须 return config
    return config
})
axios.interceptors.response.use(config => {
    // 隐藏 进度条
    NProgress.done()
    return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
