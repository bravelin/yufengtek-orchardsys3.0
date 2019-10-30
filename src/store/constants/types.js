const types = [
    'SWITCH_LOADING', // 更改全局loading状态
    'SWITCH_SCREEN_FULL', // 更改全屏状态
    'GET_WINDOW_SIZE', // 获取窗口宽高
    'SET_CURR_ROUTER', // 设置当前路由
    'UPDATE_USER_INFO',
    'CLEAR_USER_INFO',
    'SWITCH_MESSAGE_TIP',
    'SWITCH_LOGIN_STATE' // 更改登录状态
]

const typesObj = {}
types.forEach(type => { typesObj[type] = type })
export default typesObj