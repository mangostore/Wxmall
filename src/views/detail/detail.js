import {Vue, VueRouter, Cube} from '../../assets/js/common'

import routes from './routes'
import store from '../../store'
import App from './App'

import Password from '../../module/password'
Cube.createAPI(Vue, Password)

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
