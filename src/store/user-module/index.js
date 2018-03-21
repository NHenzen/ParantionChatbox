import apiService from '../../service/APIService'

const state = {
  user: {
    id: '',
    name: ''
  },
  allUsers: []
}

const getters = {
  getFriends: state => {
    let found = state.allUsers.findIndex(x => x.id === state.user.id)
    if (found >= 0) return state.allUsers[found].data.friends
  },

  getUsers: state => {
    return state.allUsers
  }
}

const mutations = {
  SET_ALL_USERS (state, user) {
    let found = state.allUsers.findIndex(x => x.id === user.id)
    if (found < 0) {
      state.allUsers.push(user)
    } else {
      state.allUsers.splice(found, 1, user) // user is probably updated, so replace it in the array
    }
  },

  SET_USER (state, user) {
    state.user = user
  },

  CLEAR_STATE (state) {
    state.user = {id: '', name: ''}
    state.allUsers = []
  }
}

const actions = {
  login ({commit}, username) {
    let id = apiService.login(username)
    let user = {id: id, user: username}
    commit('SET_USER', user)
  },

  subscribeUsers ({commit}) {
    apiService.subscribeUsers((res) => {
      if (res.user.data) commit('SET_ALL_USERS', res.user)
    })
  },

  addFriend ({commit}, id) {
    apiService.addUsersAsFriend(id)
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
