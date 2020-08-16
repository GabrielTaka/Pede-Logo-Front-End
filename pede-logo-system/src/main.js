import Vue from 'vue'
import App from './App.vue'
import router from './router/external'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'

import Vuelidate from 'vuelidate'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.use(Vuelidate)
sync(store, router)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
