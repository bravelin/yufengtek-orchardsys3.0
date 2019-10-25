const localDevReg = /(localhost|192\.168)/
export default {
    baseUrl: localDevReg.test(location.origin) ? '' : '',
    socketUrl: ''
}
