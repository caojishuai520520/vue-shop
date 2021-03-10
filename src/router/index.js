import Vue from 'vue'
import Login from '../components/Login.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' }, // 重定向 redirect
    { path: '/login', component: Login }
]

const router = new VueRouter({
    routes
})

export default router

