import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { getStore } from '../basic/libs/utils'

Vue.use(Vuex)

const state = {
  login: getStore('login') === 'true' || false,
  userInfo: JSON.parse(getStore('userInfo')),
  favorites: JSON.parse(getStore('favorites')),
  orders: null
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
