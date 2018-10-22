import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        utente: null,
        siglaDitta: null,
        ditta: null
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token
            state.utente = userData.utente
            state.siglaDitta = userData.siglaDitta
            state.ditta = userData.ditta
        },
        clearAuthData(state) {
            state.token = null
            state.utente = null
            state.siglaDitta = null
            state.ditta = null
        }
    },
    actions: {
        login({ commit }, authData) {
            axios.post('/autenticazione', {
                }, { auth: {
                    username: authData.utente,
                    password: authData.password
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'   
                },
            }).then(res => {
                console.log(res)
                const data = res.data
                commit('authUser', {
                    token: data.diTechToken.token,
                    utente: data.name,
                    ditta: data.ditta,
                    siglaDitta: data.siglaDitta
                })
                router.push('/vistatura')
            }).catch(error => {
                console.log("Errore:" + error)

            })
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
        getUtente(state) {
            return state.utente ? state.utente.toUpperCase() : state.utente
        },
        getSiglaDitta(state) {
            return state.siglaDitta
        },
        getDitta(state) {
            return state.ditta
        },
        isAuthenticated(state) {
            return state.token !== null
        }
    }
})