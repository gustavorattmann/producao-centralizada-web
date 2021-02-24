<template>
  <div class="home container">
    <div v-if="typeof status !== 'undefined' && (status != 200)">
      <h1 class="title has-text-centered">{{ message }}</h1>
      <!--<router-link to="/login">Me leve para a página login!</router-link>-->
    </div>
    <div v-else>
      <table class="table is-striped is-hoverable is-fullwidth has-text-centered" v-if="level == 1 || level == 2">
        <caption>Lista com todos usuários cadastrados no sistema</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cargo</th>
            <th>Situação</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" v-bind:key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td v-if="user.situation == 1">Ativo</td>
            <td v-else>Inativo</td>
            <td><router-link class="has-text-black" :title="'Acessar perfil de ' + user.name" :to=" { name: 'Profile', params: {id: user.id } } "><font-awesome-icon icon="id-card" /></router-link></td>
            <td><font-awesome-icon icon="edit" /></td>
            <td><font-awesome-icon icon="trash" /></td>
          </tr>
        </tbody>
      </table>
    </div>
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

        /* if (this.status === 401) {
          setTimeout(function () {
            router.push('/login')
          }, 5000)
        } */
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
