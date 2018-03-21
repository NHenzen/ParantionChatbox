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
  // TODO: this is the action in which you should call the apiService its method 'subscribeMessages'. This function
  // TODO: has a callback response which you should set with the mutation SET_MESSAGES
  subScribeToMessages ({commit, dispatch}) {
    dispatch('clearState') // leave this here so the messages won't be blotted

    apiService.subscribeMessages((response) => {
      // code here, check with console log to see what's in the response
    })
  },

  // TODO: this action only needs to call the apiService method 'sendMessage' along with the message parameter.
  setMessage ({commit, state}, message) {
    // code here
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
