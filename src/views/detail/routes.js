import Detail from './components/Detail'
import Evaluation from './components/Evaluation'
import Order from './components/Order'
import Pay from './components/Pay'
import Forget from './components/Forget'
import Success from './components/Success'

export default [
  {
    path: '/',
    component: Detail
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/evaluation',
    component: Evaluation
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/forget',
    component: Forget
  },
  {
    path: '/success',
    component: Success
  }
]
