<template>
  <div id="logout">
    <div>
      <h1 class="title has-text-centered">{{ message }}</h1>
      <div class="has-text-centered">
        <router-link :to=" { name: 'Login' }">Me leve para a página de login!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'

export default {
  name: 'Logout',
  metaInfo () {
    return {
      titleTemplate: 'Login - %s',
      meta: [
        { name: 'description', content: 'Página de logout' }
      ]
    }
  },
  data () {
    return {
      message: '',
      status: undefined
    }
  },
  mounted () {
    const config = {
      headers: {
        'content-type': 'application/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    }

    axios.get('http://api.producaocentralizada/api/users/logout', config)
      .then(res => {
        this.status = res.data.status
        this.message = res.data.msg

        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
          localStorage.removeItem('level')

          if (!localStorage.getItem('token') && !localStorage.getItem('level')) {
            setTimeout(function () {
              router.push({ name: 'Login' })
            }, 5000)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
