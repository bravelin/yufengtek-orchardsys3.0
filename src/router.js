import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import types from '@/store/constants/types'

Vue.use(Router)
const router = new Router({
    // mode: 'history',
    base: '',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/login',
            name: 'login', // 登录
            component: () => import('./views/login/Index.vue')
        },
        {
            path: '/home',
            name: 'home', // 首页
            component: () => import('./views/home/Index.vue')
        },
        {
            path: '/source',
            name: 'source', // 智慧源地
            component: () => import('./views/source/Index.vue')
        },
        {
            path: '/plant',
            name: 'plant', // 种植分布
            component: () => import('./views/plant/Index.vue')
        },
        {
            path: '/farming',
            name: 'farming', // 农事活动
            component: () => import('./views/farming/Index.vue')
        },
        {
            path: '/warehouse',
            name: 'warehouse', // 产品仓储
            component: () => import('./views/warehouse/Index.vue')
        },
        {
            path: '/origin',
            name: 'origin', // 溯源动态
            component: () => import('./views/origin/Index.vue')
        },
        {
            path: '*',
            redirect: { name: 'login' }
        }
    ]
})

router.beforeEach((to, from, next) => {
    store.commit({
        type: types.SET_CURR_ROUTER,
        from: from.name,
        to: to.name,
        query: to.query,
        instance: router
    })
    if (to.name && to.name !== from.name) {
        store.commit(types.SWITCH_LOADING, true)
    }
    next(true)
})

export default router
