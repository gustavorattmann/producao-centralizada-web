import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Meta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(store)
Vue.use(router)
Vue.use(Meta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  store,
  Meta,
  render: h => h(App)
}).$mount('#app')
