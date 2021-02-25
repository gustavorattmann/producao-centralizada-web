<template>
  <header id="header">
    <Navigation :key="$route.fullPath"/>
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
