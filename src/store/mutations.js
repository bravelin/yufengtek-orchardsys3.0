import types from '@/store/constants/types'
import tags from '@/lib/tags'
const win = window
const doc = document
const ls = localStorage

export default {
    [types.SWITCH_LOADING] (state, isShow) {
        state.loading = isShow
    },
    [types.SWITCH_SCREEN_FULL] (state, fullState) {
        state.screenFullState = fullState
    },
    [types.GET_WINDOW_SIZE] (state) {
        state.winHeight = doc.documentElement.clientHeight || win.innerHeight
        state.winWidth = doc.documentElement.clientWidth || win.innerWidth
        doc.body.style.minHeight = state.winHeight + 'px'
        let count = state.windowResizeState + 1
        count = (count > 99999) ? 1 : count // 防止无限增大
        if (state.winWidth <= 1200) {
            state.miniScreen = true
            state.smallScreen = false
        } else if (state.winWidth <= 1400) {
            state.smallScreen = true
            state.miniScreen = false
        } else {
            state.smallScreen = false
            state.miniScreen = false
        }
        state.windowResizeState = count
    },
    [types.SET_CURR_ROUTER] (state, payload) {
        const currRouter = state.currRouter
        currRouter.from = payload.from
        currRouter.to = payload.to
        currRouter.query = payload.query
        currRouter.instance = payload.instance
        if (!currRouter.to) {
            state.loading = false
            state.screenFullState = false
        }
    },
    // 更新用户信息
    [types.UPDATE_USER_INFO] (state, payload) {
        state.userType = payload.userType
        state.orchardId = payload.orchardId
        state.userName = payload.userName
        state.loginRemember = payload.loginRemember
        ls.setItem(tags.loginRemember, payload.loginRemember ? '1' : '0')
        if (payload.loginRemember) { // 记住用户信息
            ls.setItem(tags.userType, state.userType)
            ls.setItem(tags.orchardId, state.orchardId)
            ls.setItem(tags.userName, state.userName)
            ls.setItem(tags.password, payload.password)
        } else {
            ls.removeItem(tags.userType)
            ls.removeItem(tags.orchardId)
            ls.removeItem(tags.userName)
            ls.removeItem(tags.password)
        }
    },
    // 清除用户信息
    [types.CLEAR_USER_INFO] (state) {
        state.orchardId = ''
        state.userType = ''
        ls.removeItem(tags.orchardId)
        ls.removeItem(tags.userType)
        if (ls.getItem(tags.loginRemember) == '0') {
            state.userName = ''
            ls.removeItem(tags.userName)
            ls.removeItem(tags.password)
        }
    },
    // 控制NoResult提示的显示
    [types.SWITCH_MESSAGE_TIP] (state, payload) {
        state.showMessageTip = payload.show
        state.tip = payload.tip
    },
    // 更改登录状态
    [types.SWITCH_LOGIN_STATE] (state, tag) {
        state.isLogin = tag
    }
}
