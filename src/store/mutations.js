import types from '@/store/constants/types'
import StorageTags from '@/lib/storageTags'
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
        state.userToken = payload.userToken
        state.userId = payload.userId
        state.userName = payload.userName
        state.userRole = payload.userRole
        state.loginRemember = payload.loginRemember
        ls.setItem(StorageTags.loginRemember, payload.loginRemember ? '1' : '0')
        if (payload.loginRemember) { // 记住用户信息
            ls.setItem(StorageTags.userToken, state.userToken)
            ls.setItem(StorageTags.userId, state.userId)
            ls.setItem(StorageTags.userName, state.userName)
            ls.setItem(StorageTags.userRole, state.userRole)
            ls.setItem(StorageTags.password, payload.password)
        } else {
            ls.removeItem(StorageTags.userToken)
            ls.removeItem(StorageTags.userId)
            ls.removeItem(StorageTags.userName)
            ls.removeItem(StorageTags.userRole)
            ls.removeItem(StorageTags.password)
        }
    },
    // 清除用户信息
    [types.CLEAR_USER_INFO] (state) {
        state.userToken = ''
        state.userId = ''
        state.userRole = ''
        ls.removeItem(StorageTags.userToken)
        ls.removeItem(StorageTags.userId)
        ls.removeItem(StorageTags.userRole)
        if (ls.getItem(StorageTags.loginRemember) == '0') {
            state.userName = ''
            ls.removeItem(StorageTags.userName)
            ls.removeItem(StorageTags.password)
        }
    },
    // 控制NoResult提示的显示
    [types.SWITCH_MESSAGE_TIP] (state, payload) {
        state.showMessageTip = payload.show
        state.tip = payload.tip
    }
}
