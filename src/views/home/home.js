import {Vue, VueRouter} from '../../assets/js/common'

import routes from './routes'
import App from './App'

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
