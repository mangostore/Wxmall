import Vue from 'vue'
import VueRouter from 'vue-router'

import Cube from 'cube-ui'
import VueLazyload from 'vue-lazyload'
import VueImg from 'v-img'
import {SetTitle} from '../../basic'

Vue.use(Cube)
Vue.use(VueRouter)
Vue.use(VueLazyload, {
  error: 'static/images/lazy-error.png',
  loading: 'static/images/lazy-loading.png'
})
Vue.use(VueImg)
Vue.use(SetTitle)

Vue.config.productionTip = false

export {
  Vue,
  VueRouter,
  Cube
}
