import Login from './components/Login'
import Set from './components/Set'
import Feedback from './components/Feedback'

export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/set',
    component: Set,
    children: [
      {
        path: 'feedback',
        component: Feedback
      }
    ]
  }
]
