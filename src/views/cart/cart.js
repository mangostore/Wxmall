import {Vue} from '../../assets/js/common'

import store from '../../store'
import App from './App'

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
