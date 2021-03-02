<template>
  <div id="app">
    <Header/>
    <router-view class="py-5"/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Produção Centralizada',
    titleTemplate: '%s | My Awesome Webapp'
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
@import 'bulma';

.field-label-password {
  margin-bottom: 0.5em !important;
}

.field-input-password {
  margin-bottom: 0 !important;
}
</style>
