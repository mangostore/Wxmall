import Home from './components/Home'
import All from './components/All'
import Sort from './components/Sort'
import Brief from './components/Brief'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/all',
    component: All

  },
  {
    path: '/sort',
    component: Sort
  },
  {
    path: '/brief',
    component: Brief,
    props: true
  }
]
