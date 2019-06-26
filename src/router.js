import Vue from 'vue'
import Router from 'vue-router'
import Profile from './/views/Profile'
import Cities from './/views/Cities'
import WorldMap from './/views/WorldMap'
import FloraAndFauna from './views/FloraAndFauna'
import Search from './views/Search'
import WelcomeTraveler from './views/WelcomeTraveler'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeTraveler
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile')
    },
    {
      path: 'cities',
      name: 'cities',
      component: () => import('./views/Cities')
    },
    {
      path: '/worldMap',
      name: 'worldMap',
      component: () => import('./views/WorldMap')
    },
    {
      path: '/floraAndFauna',
      name: 'floraAndFauna',
      component: () => import('./views/FloraAndFauna')
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
