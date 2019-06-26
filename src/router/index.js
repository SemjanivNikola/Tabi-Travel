import Vue from 'vue'
import Router from 'vue-router'
import WelcomeTraveler from "../views/WelcomeTraveler"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeTraveler
    },
  ]
})

