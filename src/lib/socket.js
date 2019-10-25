import config from '@/lib/config'
import store from '@/store/index'
import ns from '@/store/constants/ns'
import types from '@/store/constants/types'
import { formatTime } from '@/lib/util'

let nextRefreshTimer = null
let nextRefreshName = ''
let connTimer = null
let socket = null

function initSocket () {
    if (socket) {
        socket.close()
    }
    socket = new WebSocket(config.socketUrl + '?token=' + store.state.userToken)
    socket.onopen = onSocketOpen
    socket.onmessage = onSocketMessage
    socket.onerror = onSocketError
    socket.onclose = onSocketClose
    socket.send = onSocketSend
}

function onSocketOpen (e) {
    console.log('origin web socket open...', formatTime(new Date()))
    if (connTimer) {
        clearInterval(connTimer)
    }
}

function onSocketMessage (e) {
    const socketData = e.data
    const currPageName = store.state.currRouter.to
    console.log('socket data....', socketData)
}

function doRefreshPageData (pageName) {
}

function onSocketError (e) {
    console.log('socket error....', formatTime(new Date()), e)
}

function onSocketClose (e) {
    console.log('socket close....', formatTime(new Date()))
    console.log('close socket event...', e)
    console.log('reconnect socket...')
    socket = null
    if (connTimer) clearInterval(connTimer)
    connTimer = setInterval(() => {
        initSocket()
    }, 20000)
}

function onSocketSend (e) {
    console.log('send successful...', e)
}

initSocket()
export default initSocket
