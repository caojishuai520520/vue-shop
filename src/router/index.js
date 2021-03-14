import Vue from 'vue'
import Login from '../components/Login.vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import WelCome from '../components/WelConme.vue'
import Users from '../components/uesr/Users.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' }, // 重定向 redirect
    { path: '/login', component: Login },
    { path: '/home', component: Home ,
        redirect:'/welcome', //重定向 redirect
        children:[ // 子路由
            {path:'/welcome',component:WelCome},
            {path:'/users',component:Users}, // 用户列表组件
        ]
    },
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) =>{
    // to:将要访问的路径
    // from:代表从哪个路由跳转而来
    // next:是一个函数，表示放行
    // next:有两种方式放行 1.next()直接放行   2.next('/login')强制跳转
    if(to.path === '/login') return next();
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    // 判断有没有token值，如果没有就直接强制跳转到登录页
    if(!tokenStr) return next('/login');
    // 如果有值直接放行
    next()
})

export default router

