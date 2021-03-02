import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome, faSignInAlt, faSignOutAlt, faIdCard, faEdit, faTrash, faUser, faEnvelope, faKey, faEye, faEyeSlash, faUserTag, faPaperPlane, faBan, faCheck, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHome, faSignInAlt, faSignOutAlt, faIdCard, faEdit, faTrash, faUser, faEnvelope, faKey, faEye, faEyeSlash, faUserTag, faPaperPlane, faBan, faCheck, faExclamationTriangle
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

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
