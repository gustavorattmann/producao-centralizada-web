import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/users/Home.vue'
import Profile from '../views/users/Profile.vue'
import Login from '../views/users/Login.vue'
import Logout from '../views/users/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
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
