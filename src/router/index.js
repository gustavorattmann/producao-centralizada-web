import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/users/Home.vue'
import Login from '../views/users/Login.vue'
import Logout from '../views/users/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    title: 'Homepage Title',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/users/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
