import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token
        },
        clearAuthData(state) {
            state.token = null
        }
    },
    actions: {
        login({ commit }, authData) {
            /* axios.post('todo', {
                utente: authData.utente,
                password: authData.password
            })
                .then(res => {
                    console.log(res)
                    commit('authUser', {
                        token: res.data.token
                    })
                })
                .catch(error => console.log(error)) */

            /* fake, to delete */
            commit('authUser', {
                token: 'ABCDEF123'
            })
            router.push('/')
        },
        logout({ commit }) {
            commit('clearAuthData')
            router.replace('/login')
        }
    },
    getters: {
        getToken(state) {
            return state.token
        },
        isAuthenticated(state) {
            return state.token !== null
        }
    }
})