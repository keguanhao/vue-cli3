import Vue from 'vue'
import Vuex from 'vuex'
import menu from './xiaoai/store/menu/index'
import page from './xiaoai/store/page/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        menu,
        page
    }
})