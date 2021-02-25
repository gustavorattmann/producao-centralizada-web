<template>
  <nav id="nav" class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Produção Centralizada</router-link>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMain">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarMain" class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/" class="navbar-item"><font-awesome-icon icon="home" class="mr-1" />Inicial</router-link>
        <router-link to="/login" class="navbar-item" v-if="typeof token === 'undefined' || token == null"><font-awesome-icon icon="sign-in-alt" class="mr-1" />Login</router-link>
        <router-link to="/logout" class="navbar-item" v-if="typeof token !== 'undefined' && token !== null"><font-awesome-icon icon="sign-out-alt" class="mr-1" />Sair</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      token: undefined
    }
  },
  mounted () {
    if (typeof localStorage.getItem('token') !== 'undefined') {
      this.token = localStorage.getItem('token')
    }
  }
}
</script>
