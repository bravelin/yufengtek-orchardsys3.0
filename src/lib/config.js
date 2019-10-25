const localReg = /(localhost|192\.168)/ 
export default {
    baseUrl: localReg.test(location.origin) ? '' : '',
    socketUrl: ''
}
