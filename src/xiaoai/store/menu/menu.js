const types = {
    ADD_MENU: 'ADD_MENU',
    LOAD_ROUTES: 'LOAD_ROUTES',//控制是否加载路由
    SET_LEFTMENU_ISCOLLAPSE: 'SET_LEFTMENU_ISCOLLAPSE',//是否折叠侧边栏
    INIT_LEFTMENU_WIDTH: 'INIT_LEFTMENU_WIDTH',
    SET_LEFT_WIDTH: 'SET_LEFT_WIDTH'
}
const state = {
    items: [],
    isLoadRouter: false,
    isCollapse: false,
    leftMenu: {
        width: '180px',
        isOpen: true
    }
}

const getters = {
    menuitems: state => state.items,
    isLoadRouter: state => state.isLoadRouter,
    isCollapse: state => state.isCollapse
}

const mutations = {
    [types.ADD_MENU](state, menuItems) {
        if (menuItems.length === 0) {
            state.items = []
        } else {
            state.items = menuItems
        }
    },
    [types.LOAD_ROUTES](state) {
        state.isLoadRouter = true;
    },
    [types.SET_LEFTMENU_ISCOLLAPSE](state) {
        state.isCollapse = !state.isCollapse
    },
    [types.SET_LEFT_WIDTH](state) {
        if (state.leftMenu.isOpen) {
            state.leftMenu.width = 35
        } else {
            state.leftMenu.width = 180
        }
        state.leftMenu.isOpen = !state.leftMenu.isOpen
    }
}
const actions = {
    addMenu: ({ commit }, menuItems) => {
        if (menuItems.length > 0) {
            commit(types.ADD_MENU, menuItems)
        }
    },
    loadRouter: ({ commit }) => {
        commit(types.LOAD_ROUTES)
    },
    setLeftCollapse: ({ commit }) => {
        commit(types.SET_LEFTMENU_ISCOLLAPSE)
    },
    setLeftWidth: ({ commit }) => {
        commit(types.SET_LEFT_WIDTH)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}