import {setStore} from '../basic/libs/utils'

export default {
  RECORD_USERINFO (state, info) {
    state.login = true
    state.userInfo = info || null
    setStore('login', true)
    setStore('userInfo', info || null)
  },
  RECORD_FAVORITES (state, favorites) {
    state.favorites = favorites || null
    setStore('favorites', favorites || null)
  },
  RECORD_ORDERS (state, orders) {
    state.orders = orders || null
  },
  OUT_LOGIN (state) {
    state.login = false
    state.userInfo = null
    setStore('login', false)
    setStore('userInfo', null)
  },
  RECORD_SHOPINFO (state, shopInfo) {
    state.shopInfo = shopInfo
  }
}
