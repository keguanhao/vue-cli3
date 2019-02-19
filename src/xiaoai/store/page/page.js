const types = {
    SET_RIGHT_CONTENT: 'SET_RIGHT_CONTENT'
}


const state = {
    rightContent: {
        width: '',
        height: ''
    },
    text: 'hello'
}
const getters = {
    width: state => state.rightContent.width,
    height: state => state.rightContent.height
}

const mutations = {
    [types.SET_RIGHT_CONTENT](state, contentObj) {
        state.rightContent.width = contentObj.width;
        state.rightContent.height = contentObj.height
    }
}

const actions = {
    setRightWidth: ({ commit }, contentObj) => {
        commit(types.SET_RIGHT_CONTENT, contentObj)
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}