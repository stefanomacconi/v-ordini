import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import store from './store/store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/spweb/rest'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')