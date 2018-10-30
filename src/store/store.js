import Vue from 'vue'
import Vuex from 'vuex'

import utente from './modules/utente'
import ordini from './modules/ordini'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        utente,
        ordini
    },
})