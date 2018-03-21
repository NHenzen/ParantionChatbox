import apiService from '../../service/APIService'

const state = {
  messages: []
}

const getters = {
  getMessages: state => {
    return state.messages
  },

  getGlobalMessages: state => {
    return state.messages.filter((msg) => {
      if (msg.to === 'global') return msg
    })
  }
}

const mutations = {
  SET_MESSAGES (state, msg) {
    state.messages.push(msg)
  },

  CLEAR_STATE (state) {
    state.messages = []
  }
}

const actions = {
  subScribeToMessages ({commit}) {
    apiService.subscribeMessages(res => {
      console.log('%c msg received', 'color:  #11b0d8', res)
      commit('SET_MESSAGES', res.message.data)
    })
  },

  setMessage ({commit, state}, message) {
    apiService.sendMessage(message)
  },

  clearState ({commit}) {
    commit('CLEAR_STATE')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
