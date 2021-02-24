<template>
  <header id="header">
    <Navigation/>
    <router-view/>
  </header>
</template>

<script>
import Navigation from './Navigation.vue'

export default {
  name: 'Header',
  components: {
    Navigation
  }
}
</script>
