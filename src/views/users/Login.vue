<template>
  <div class="login">
    <div v-if="typeof status !== 'undefined' && status != 200">
      <h1>{{ message }}</h1>
    </div>
    <div v-else>
      <h1>Faça login</h1>
      <form @submit.prevent="signIn">
        <div>
          <label for="email">E-mail: </label>
          <input type="email" name="email" id="email" v-model="login.email">
        </div>
        <div>
          <label for="password">Senha: </label>
          <input type="password" name="password" id="password" v-model="login.password">
        </div>
        <div>
          <button type="submit">Logar</button>
        </div>
      </form>
      <section>
        <p v-if="status != '' && status != 200">{{ message }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'

export default {
  name: 'Login',
  metaInfo () {
    return {
      titleTemplate: 'Login - %s',
      meta: [
        { name: 'description', content: 'Página de login.' }
      ]
    }
  },
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      token: undefined,
      level: undefined,
      message: '',
      status: undefined
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      router.push('/')
    } else {
      this.status = localStorage.getItem('status')
      this.message = localStorage.getItem('message')
    }
  },
  methods: {
    signIn () {
      const loginForm = new FormData()

      loginForm.append('email', this.login.email)
      loginForm.append('password', this.login.password)

      const config = {
        headers: {
          'content-type': 'application/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      }

      axios.post('http://api.producaocentralizada/api/users/login', loginForm, config)
        .then(res => {
          if (typeof res.data.status !== 'undefined') {
            this.status = res.data.status
            this.message = res.data.msg

            localStorage.setItem('status', this.status)
            localStorage.setItem('message', this.message)
          }

          if (typeof res.data.token !== 'undefined') {
            this.token = res.data.token
            this.level = res.data.level

            localStorage.setItem('token', this.token)
            localStorage.setItem('level', this.level)
          }

          router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
