<template v-if="childDataLoaded">
  <div class="home">
    <div v-if="typeof status !== 'undefined' && (status != 200 || status != 201)">
      <h1>Erro {{ status }}: {{ message }}</h1>
      <!--<router-link to="/login">Me leve para a página login!</router-link>-->
    </div>
    <table class="" v-if="level == 1 || level == 2">
      <tr>
        <!--<caption>Todos usuários no sistema</caption>-->
        <th>ID</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Cargo</th>
        <th>Situação</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="user in users" v-bind:key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td v-if="user.situation == 1">Ativo</td>
        <td v-else>Inativo</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
// import router from '../../router/index'

export default {
  name: 'Home',
  metaInfo: {
    titleTemplate: null,
    meta: [
      { name: 'description', content: 'Página inicial.' }
    ]
  },
  data () {
    return {
      users: undefined,
      level: undefined,
      message: '',
      status: undefined
    }
  },
  mounted () {
    this.level = localStorage.getItem('level')

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    }

    axios.get('http://api.producaocentralizada/api/users', config)
      .then(res => {
        if (typeof res.data.status !== 'undefined') {
          this.status = res.data.status
        } else {
          this.users = res.data
        }

        if (this.status !== 200 || this.status !== 201) {
          this.message = res.data.msg
        }

        if (this.status === 401) {
          setTimeout(function () {
            // router.push('/login')
          }, 5000)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
