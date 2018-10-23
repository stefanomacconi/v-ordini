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
        login({ commit, dispatch }, authData) {
            axios.post('/autenticazione', {
                }, { auth: {
                    username: authData.utente,
                    password: authData.password
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'   
                },
            }).then(res => {
                // eslint-disable-next-line
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
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
            })
        },
        logout({ commit }) {
            commit('clearAuthData')
            router.replace('/login')
        },
        // eslint-disable-next-line
        handleError({}, error) {
            const errorData = {
                message : error.message,
                developerMessage : error.developerMessage,
                code : error.code,
                status : error.status,
            }
            // eslint-disable-next-line
            console.log(errorData)
            router.push({ name: 'error', params: {
                message : errorData.message,
                developerMessage : errorData.developerMessage,
                code : errorData.code,
                status : errorData.status, 
            }})
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