import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/users/Home.vue'
import UserRegister from '../views/users/Register.vue'
import UserProfile from '../views/users/Profile.vue'
import Login from '../views/users/Login.vue'
import Logout from '../views/users/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usuario',
    name: 'User',
    component: User
  },
  {
    path: '/usuario/cadastro',
    name: 'UserRegister',
    component: UserRegister
  },
  {
    path: '/perfil/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sair',
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
