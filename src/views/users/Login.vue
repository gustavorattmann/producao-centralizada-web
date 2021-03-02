<template>
  <div class="container" id="login">
    <div v-if="typeof status !== 'undefined' && status == 200">
      <h1 class="title has-text-centered">{{ message }}</h1>
    </div>
    <div class="box" v-else>
      <h1 class="title has-text-centered">Faça login</h1>
      <form @submit.prevent="signIn">
        <div class="field">
          <label for="email" class="label" >E-mail: </label>
          <div class="control has-icons-left">
            <input type="email" class="input" v-model="login.email">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="envelope" />
            </span>
          </div>
        </div>
        <div class="field">
          <label for="password" class="label">Senha: </label>
        </div>
        <div class="field has-addons">
          <div class="control is-expanded has-icons-left has-icons-right">
            <input :type="eye ? 'text' : 'password'" class="input" v-model="login.password">
            <span class="icon is-small is-left">
              <font-awesome-icon icon="key" />
            </span>
          </div>
          <div class="control">
            <button type="button" class="button is-info" @click.stop="showPassword">
              <font-awesome-icon icon="eye-slash" v-if="eye" />
              <font-awesome-icon icon="eye" v-else />
            </button>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button type="submit" class="button is-link"><font-awesome-icon icon="sign-in-alt" class="mr-2" />Logar</button>
          </div>
          <div class="control">
            <button type="reset" class="button is-link is-light"><font-awesome-icon icon="ban" class="mr-2" />Limpar</button>
          </div>
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
      eye: false,
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

            router.push({ name: 'User' })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    showPassword () {
      if (this.eye) {
        this.eye = false
      } else {
        this.eye = true
      }
    }
  }
}
</script>
