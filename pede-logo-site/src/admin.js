import Vue from 'vue'
import Admin from './Admin.vue'
import router from './router/admin'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Admin)
}).$mount('#app')
