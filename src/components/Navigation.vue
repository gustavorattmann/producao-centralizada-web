<template>
  <nav id="nav" class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Produção Centralizada</router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMain" v-on:click="active = !active" v-bind:class=" {'is-active': active} ">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarMain" class="navbar-menu" v-bind:class=" {'is-active': active} ">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable" v-if="(typeof token !== 'undefined' && token !== null) && (typeof level !== 'undefined' && (level == 1 || level == 2))">
          <a class="navbar-link">Usuários</a>
          <div class="navbar-dropdown">
            <router-link :to=" { name: 'User' } " class="navbar-item"><font-awesome-icon icon="user" class="mr-1" />Visualizar</router-link>
            <router-link :to=" { name: 'UserRegister' } " class="navbar-item"><font-awesome-icon icon="sign-out-alt" class="mr-1" />Cadastro</router-link>
          </div>
        </div>
        <router-link :to=" { name: 'Logout' } " class="navbar-item" v-if="(typeof token !== 'undefined' && token !== null) && (typeof level !== 'undefined' && level !== null)"><font-awesome-icon icon="sign-out-alt" class="mr-1" />Sair</router-link>
        <router-link :to=" { name: 'Login' } " class="navbar-item" v-if="(typeof token === 'undefined' || token === null) || (typeof level === 'undefined' || level === null)"><font-awesome-icon icon="sign-in-alt" class="mr-1" />Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      active: false,
      token: undefined,
      level: undefined
    }
  },
  mounted () {
    if (typeof localStorage.getItem('token') !== 'undefined') {
      this.token = localStorage.getItem('token')
    }

    if (typeof localStorage.getItem('level') !== 'undefined') {
      this.level = localStorage.getItem('level')
    }
  }
}
</script>
