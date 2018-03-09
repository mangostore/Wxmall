import {Vue, VueRouter} from '../../assets/js/common'
import {Validator} from '../../basic'
import routes from './routes'
import store from '../../store'
import App from './App'

Vue.use(Validator)

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
