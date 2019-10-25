// 时间格式化
export function formatTime (date, format = 'yyyy-MM-dd hh:mm:ss') {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

export function getPageParams () {
    const hashStr = location.hash
    const posIndex = hashStr.indexOf('?')
    if (posIndex > 0) {
        const str = hashStr.slice(posIndex + 1)
        if (str) {
            const params = {}
            const arr = str.split('&')
            let list = null
            arr.forEach(item => {
                list = item.split('=')
                if (list.length == 2) { params[list[0]] = decodeURIComponent(list[1]) }
            })
            return params
        } else {
            return {}
        }
    } else {
        return {}
    }
}
