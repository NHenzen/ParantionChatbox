import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import chat from './chat-module'
import user from './user-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState({storage: window.sessionStorage, key: 'chatbox-vx'})],
  modules: {
    chat, user
  },
  strict: true
})

export default store
