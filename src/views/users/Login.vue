<template>
  <div class="login container" id="login">
    <div v-if="typeof status !== 'undefined' && status == 200">
      <h1 class="title has-text-centered">{{ message }}</h1>
    </div>
    <div class="box" v-else>
      <h1 class="title has-text-centered">Faça login</h1>
      <form @submit.prevent="signIn">
        <div class="field">
          <label class="label" for="email">E-mail: </label>
          <div class="control">
            <input type="email" class="input" name="email" id="email" v-model="login.email">
          </div>
        </div>
        <div class="field">
          <label class="label" for="password">Senha: </label>
          <div class="control">
            <input type="password" class="input" name="password" id="password" v-model="login.password">
          </div>
        </div>
        <div class="has-text-right">
          <button class="button is-info" type="submit">Logar</button>
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
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
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
          }

          if (typeof res.data.token !== 'undefined') {
            this.token = res.data.token
            this.level = res.data.level

            localStorage.setItem('token', this.token)
            localStorage.setItem('level', this.level)

            router.push('/')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
