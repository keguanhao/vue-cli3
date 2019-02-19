import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//导入封装好的回调函数
import { gbs, cbs } from '../config/index'
export default function ({
    type,
    path,
    data,
    fn,
    errFn,
    headers,
    opts
} = {}) {
    var options = {
        method: type,
        url: path,
        headers: headers && typeof headers === 'object' ? headers : {}
    }
    options[type === 'get' ? 'params' : 'data'] = data;
    if (opts && typeof opts === 'object') {
        for (var f in opts) {
            options[f] = opts[f];
        }
    }
    Vue.axios(options).then((res) => {
        fn(res.data);
    }).catch((error) => {
        errFn(error);
    });
}