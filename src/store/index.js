import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

const state = {
  baseurl: process.env.API_ROOT
}

export default new vuex.Store({
  state
})
