export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
};
export const generateRoutesFromMenu = (menuData = [], routes = [], componentNew) => {
    for (var i = 0; i < menuData.length; i++) {
        const menuobj = menuData[i]
        const component = menuData[i].component
        if (component && component !== 'Content') {
            console.log('../page/' + menuData[i].component + '.vue')
            componentNew = require('../page/' + menuData[i].component + '.vue').default
            // componentNew = resolve => require(['../page/' + menuData[i].component + '.vue'], resolve)
        } else {
            componentNew = require('../layout/' + menuData[i].component + '.vue').default
            // componentNew = resolve => require(['../layout/' + menuData[i].component + '.vue'], resolve)
        }
        menuobj['component'] = componentNew
        routes.push(menuobj)
        generateRoutesFromMenu(menuobj.children)
    }
    return routes
}

export const formatDate = (date) => {
    var reDate = date + '';
    var resultDate = '';
    var year = reDate.substring(0, 4),
        month = reDate.substring(4, 6),
        day = reDate.substring(6, 8),
        hour = reDate.substring(8, 10),
        minute = reDate.substring(10, 12),
        second = reDate.substring(12, 14);
    resultDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    return resultDate;
}
//判断是否为空
export const isEmpty = (str) => {
    if (typeof str == "string") {
        str = str.replace(/\"|&nbsp;|\\/g, '').replace(/^\s$/, '');
        if (str == '' || str == 'undefined' || str == "null") {
            return true;
        } else {
            return false;
        }
    } else if (typeof str == "undefined") {
        return true
    } else if (typeof str == "number") {
        return false;
    } else if (typeof str == "false") {
        return false;
    } else if (typeof str == "object") {
        if (JSON.stringify(str) == "{}") {
            return true;
        } else {
            return false;
        }
    }
    if (str instanceof Array && str.length == 0) {
        return true;
    } else {
        return false;
    }
}
//格式化日期
export const allFormatDate = (date, type) => {
    console.log(date)
    let year = date.getFullYear(),
        month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth(),
        day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
        millSceonds = date.getMilliseconds() < 10 ? "0" + date.getMilliseconds() : date.getMilliseconds();
    if (type == 1) {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds + "." + milliseconds;
    } else if (type == 2) {
        return year + "" + month + "" + day + "" + hour + "" + minutes + "" + seconds;
    } else if (type == 3) {
        return year + "-" + month + "-" + day;
    } else if (type == 4) {
        console.log(hour, minutes, seconds)
        return `${hour}:${minutes}:${seconds}`
    } else {
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    }

}
//截取时间
export const substrTime = (timeStr) => {
    var resultTime = '';
    resultTime = timeStr.substring(0, 10) + ' ' + timeStr.substring(12, 20);
    return resultTime
}