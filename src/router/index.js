import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({y: 0}),
  routes
})

Router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

function isLoggedIn () {
  let vuex = sessionStorage.getItem('chatbox-vx')
  let parsed = JSON.parse(vuex)
  return !!(parsed && parsed.user && Object.keys(parsed.user.user).length > 0)
}

export default Router
