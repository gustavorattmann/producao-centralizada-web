<template>
  <div id="logout">
    <h1 class="title has-text-centered">Página não encontrada!</h1>
    <div class="has-text-centered">
      <router-link :to=" { name: 'User' }" v-if="token !== null && level !== null">Me leve para a página inicial!</router-link>
      <router-link :to=" { name: 'Login' }" v-else>Me leve para a página de login!</router-link>
    </div>
  </div>
</template>

<script>
import router from '../router/index'

export default {
  name: 'NotFound',
  metaInfo () {
    return {
      titleTemplate: 'Página não encontrada - %s',
      meta: [
        { name: 'description', content: 'Página não encontrada' }
      ]
    }
  },
  data () {
    return {
      level: undefined,
      token: undefined
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
    this.level = localStorage.getItem('level')

    if (this.token !== null && this.level !== null) {
      setTimeout(function () {
        router.push({ name: 'User' })
      }, 5000)
    } else {
      setTimeout(function () {
        router.push({ name: 'Login' })
      }, 5000)
    }
  }
}
</script>
