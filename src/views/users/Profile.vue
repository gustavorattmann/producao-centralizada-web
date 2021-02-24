<template>
  <div id="profile" class="container">
    <h1 class="title has-text-centered" v-if="typeof status !== 'undefined' && (status == 400 || status == 401 || status == 500)">{{ message }}</h1>
    <section v-else>
      <h1>Perfil de {{ user.name }}</h1>
      <p><strong>E-mail:</strong> {{ user.email }}</p>
      <p><strong>Cargo:</strong> {{ user.role }}</p>
      <p v-if="user.situation == 1"><strong>Situação:</strong> Ativo</p>
      <p v-else><strong>Situação:</strong> Inativo</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Profile',
  props: ['id'],
  data () {
    return {
      user: [],
      message: '',
      status: ''
    }
  },
  mounted () {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      withCredentials: true
    }

    axios.get('http://api.producaocentralizada/api/users/profile/' + this.id, config)
      .then(res => {
        if (typeof res.data.status !== 'undefined') {
          this.status = res.data.status
        } else {
          this.user = res.data
        }

        if (this.status !== 200 || this.status !== 201) {
          this.message = res.data.msg
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
