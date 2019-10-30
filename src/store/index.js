import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'
import tags from '@/lib/tags'

Vue.use(Vuex)
const ls = localStorage
export default new Vuex.Store({
    state: {
        winHeight: 0, // 当前窗口高度
        winWidth: 0, // 窗口宽度
        showMessageTip: false,
        tip: '',
        currRouter: { // 当前页面路由信息
            from: '',
            to: '',
            query: null,
            instance: null // 路由实例
        },
        loading: false, // loading的状态
        windowResizeState: 0,
        screenFullState: false,
        smallScreen: false, // 屏幕宽度<1400 -- 匹配1366
        miniScreen: false, // 屏幕宽度小于 1200 -- 匹配1024

        // 与当前登录用户的相关状态
        isLogin: false,
        userName: ls.getItem(tags.userName) || '', // 用户名
        userType: ls.getItem(tags.userType) || '', // 用户类型
        orchardId: ls.getItem(tags.orchardId) || '' // 果园ID
    },
    mutations,
    actions,
    modules
})
