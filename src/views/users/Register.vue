<template>
  <div id="register" class="container">
    <div v-if="level != 1 && level != 2">
      <h1 class="title has-text-centered">{{ message }}</h1>
      <!--<router-link to="/login">Me leve para a página login!</router-link>-->
    </div>
    <div v-else>
      <div class="box">
        <form @submit.prevent="register">
          <h1 class="title has-text-centered">Cadastro de usuário</h1>
          <div class="field">
            <label for="name" class="label">Nome:</label>
            <div class="control has-icons-left has-icons-right">
              <input type="text" class="input" v-model="user.name" @blur="requiredName" v-bind:class="validation.name.class">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="user" />
              </span>
              <span class="icon is-small is-right">
                <font-awesome-icon icon="check" class="help is-success" v-if="validation.name.required == true" />
                <font-awesome-icon icon="exclamation-triangle" class="help is-danger" v-if="validation.name.required == false" />
              </span>
            </div>
            <p class="help" @class="validation.name.class" v-if="validation.name.message != ''">{{ validation.name.message }}</p>
          </div>
          <div class="field">
            <label for="email" class="label">Email:</label>
            <div class="control has-icons-left has-icons-right">
              <input type="email" class="input" v-model="user.email" @blur="requiredEmail" v-bind:class="validation.email.class">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="envelope" />
              </span>
              <span class="icon is-small is-right">
                <font-awesome-icon icon="check" class="help is-success" v-if="validation.email.required == true" />
                <font-awesome-icon icon="exclamation-triangle" class="help is-danger" v-if="validation.email.required == false" />
              </span>
            </div>
            <p class="help" @class="validation.email.class" v-if="validation.email.message != ''">{{ validation.email.message }}</p>
          </div>
          <div class="field field-label-password">
            <label for="password" class="label">Senha:</label>
          </div>
          <div class="field has-addons field-input-password">
            <div class="control is-expanded has-icons-left has-icons-right">
              <input :type="eye ? 'text' : 'password'" class="input" v-model="user.password" @blur="requiredPassword" v-bind:class="validation.password.class">
              <span class="icon is-small is-left">
                <font-awesome-icon icon="key" />
              </span>
              <span class="password icon is-small is-right">
                <font-awesome-icon icon="check" class="help is-success" v-if="validation.password.required == true" />
                <font-awesome-icon icon="exclamation-triangle" class="help is-danger" v-if="validation.password.required == false" />
              </span>
            </div>
            <div class="control">
              <button type="button" class="button is-info" @click.stop="showPassword">
                <font-awesome-icon icon="eye-slash" v-if="eye" />
                <font-awesome-icon icon="eye" v-else />
              </button>
            </div>
          </div>
          <div class="field field-text-password">
            <p class="help" @class="validation.password.class" v-if="validation.password.message != ''">{{ validation.password.message }}</p>
          </div>
          <div class="field">
            <label for="role" class="label">Cargo:</label>
            <div class="control has-icons-left">
              <div class="select">
                <select v-model="user.role">
                  <option :selected="true" :disabled="true">Selecione uma opção</option>
                  <option v-for="role in roles" v-bind:key="role.id" v-bind:value="role.id">{{ role.name }}</option>
                </select>
                <span class="icon is-small is-left">
                  <font-awesome-icon icon="user-tag" />
                </span>
              </div>
            </div>
          </div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button type="submit" class="button is-link"><font-awesome-icon icon="paper-plane" class="mr-2" />Cadastrar</button>
            </div>
            <div class="control">
              <button type="reset" class="button is-link is-light"><font-awesome-icon icon="ban" class="mr-2" />Limpar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  metaInfo: {
    titleTemplate: 'Cadastro - %s',
    meta: [
      { name: 'description', content: 'Página de cadastro.' }
    ]
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: 'Selecione uma opção'
      },
      validation: {
        name: {
          required: undefined,
          message: '',
          class: ''
        },
        email: {
          required: undefined,
          message: '',
          class: ''
        },
        password: {
          required: undefined,
          message: '',
          class: ''
        }
      },
      eye: false,
      roles: undefined,
      level: undefined,
      message: '',
      status: undefined
    }
  },
  mounted () {
    this.level = localStorage.getItem('level')

    const config = {
      headers: {
        'content-type': 'application/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    }

    axios.get('http://api.producaocentralizada/api/roles', config)
      .then(res => {
        if (typeof res.data.status !== 'undefined') {
          this.status = res.data.status
        } else {
          this.roles = res.data
        }

        if (this.status !== 200 || this.status !== 201) {
          this.message = res.data.msg
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    register () {

    },
    showPassword () {
      if (this.eye) {
        this.eye = false
      } else {
        this.eye = true
      }
    },
    requiredName () {
      if (this.user.name.length < 1) {
        this.validation.name.required = false
        this.validation.name.message = 'Campo está vazio!'
        this.validation.name.class = 'is-danger'
      } else {
        this.validation.name.required = true
        this.validation.name.message = ''
        this.validation.name.class = 'is-success'
      }
    },
    requiredEmail () {
      if (this.user.email.length < 1) {
        this.validation.email.required = false
        this.validation.email.message = 'Campo está vazio!'
        this.validation.email.class = 'is-danger'
      } else {
        this.validation.email.required = true
        this.validation.email.message = ''
        this.validation.email.class = 'is-success'
      }
    },
    requiredPassword () {
      if (this.user.password.length < 1) {
        this.validation.password.required = false
        this.validation.password.message = 'Campo está vazio!'
        this.validation.password.class = 'is-danger'
      } else {
        this.validation.password.required = true
        this.validation.password.message = ''
        this.validation.password.class = 'is-success'
      }
    }
  }
}
</script>
