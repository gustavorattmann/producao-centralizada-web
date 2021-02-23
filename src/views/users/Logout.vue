<template>
  <div id="logout">
    <div>
      <h1 v-if="typeof status !== 'undefined' && (status == 200 || status == 201)">{{ message }}</h1>
      <h1 v-else>Erro {{ status }}: {{ message }}</h1>
      <router-link to="/login">Me leve para a página login!</router-link>
      <!--<a href="" target="_self">Me leve para a página de login!</a>-->
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
        }
      })
      .catch(error => {
        console.log(error)
      })

    setTimeout(function () {
      router.push('/login')
    }, 5000)
  }
}
</script>
