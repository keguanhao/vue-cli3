import Vue from 'vue'
import Router from 'vue-router'
import MyForm from './views/MyForm'
import MyAxios from './views/Axios'
import MyVueX from './views/VueX'
import XiaoLogin from './xiaoai/login/Login'
import AddRouter from './views/AddRouter'
import HelloWorld from './components/HelloWorld'
import MallLogin from './mall_admin/views/login/Login'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/form',
        name: 'MyForm',
        component: MyForm
    }, {
        path: '/helloworld',
        name: 'HelloWorld',
        component: HelloWorld
    }, {
        path: '/addrouter',
        name: 'AddRouter',
        component: AddRouter
    }, {
        path: '/axios',
        name: 'MyAxios',
        component: MyAxios
    }, {
        path: '/vuex',
        name: 'MyVueX',
        component: MyVueX
    }, {
        path: '/',
        name: 'XiaoLogin',
        component: XiaoLogin
    }, {
        path: '/admin/login',
        name: 'AdminLogin',
        component: MallLogin
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
    ]
})