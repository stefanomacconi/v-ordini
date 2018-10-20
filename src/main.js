import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import store from './store'
import router from './router'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')