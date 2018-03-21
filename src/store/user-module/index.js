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

  // TODO: this mutation should set the user (given as parameter) that is defined in the state.
  SET_USER (state, user) {
    // code here
  },

  CLEAR_STATE (state) {
    state.user = {id: '', name: ''}
    state.allUsers = []
  }
}

const actions = {
  // TODO: Step one: create an object with the keys 'user' and 'id'. Give the key 'user' the value of the parameter username.
  // TODO: Give the key 'id' the value that comes from the apiService call as response.
  // TODO: Step two: commit the user to the store with the SET_USER mutation.
  login ({commit}, username) {
    // start programming here
  },

  // TODO: this is the action in which you should call the apiService its method 'subscribeUsers'. This function
  // TODO: has a callback response which you should set with the mutation SET_ALL_USERS
  subscribeUsers ({commit}) {
    apiService.subscribeUsers((response) => {
      // code here, you can do console log to check what's in the response
    })
  },

  // TODO: BONUS
  // Call the apiService addUsersAsFriend method, along with the id parameter.
  addFriend ({commit}, id) {
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
