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
        ditta: null,
        tipiDocumento: [],
        tipoDocumento: null,
        confermeOrdine: [],
        confermaOrdine: null,
        ordini: []
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
        },
        clearData(state) {
            state.tipiDocumento = [],
            state.tipoDocumento = null,
            state.confermeOrdine = [],
            state.confermaOrdine = null,
            state.ordini = []
        },
        setTipoDocumento(state, tipoDocumento) {
            state.tipoDocumento = tipoDocumento
        },
        setTipiDocumento(state, tipiDocumento) {
            state.tipiDocumento = tipiDocumento
        },
        setConfermaOrdine(state, confermaOrdine) {
            state.confermaOrdine = confermaOrdine
        },
        setConfermeOrdine(state, confermeOrdine) {
            state.confermeOrdine = confermeOrdine
        },
        setOrdini(state, ordini) {
            state.ordini = ordini
        }
    },
    actions: {
        login({ commit, dispatch}, authData) {
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
                dispatch('initEnvironment')
                router.push('/vistatura')
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
            })
        },
        logout({ commit }) {
            commit('clearAuthData')
            commit('clearData')
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
        },
        initEnvironment({ state, dispatch }) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token;
            dispatch('fetchTipiDocumento')
            dispatch('fetchConfermeOrdine')
        },
        fetchTipiDocumento({ commit, dispatch }) {
            axios.get('/tipo-documento/ordini')
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                // clean the result 
                const tipiDocumentoData = res.data
                const listaTipiDocumento = []
                if (tipiDocumentoData) {
                    tipiDocumentoData.forEach(tipoDoc => {
                        var tipo = {
                            codice: tipoDoc.codice,
                            descrizione: tipoDoc.descrizione
                        }
                        listaTipiDocumento.push(tipo)
                    });
                }
                commit('setTipiDocumento', listaTipiDocumento)
                dispatch('setTipoDocumento', listaTipiDocumento[0])
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
            })
        },
        fetchConfermeOrdine({ commit, dispatch }) {
            axios.get('/conferma-ordine')
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setConfermeOrdine', res.data)
                dispatch('setConfermaOrdine', res.data[0])
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
            })
        },
        async fetchOrdiniDaVistare({ commit, dispatch, state }) {
            axios.get('/ordine/fornitore/da-vistare/' 
                + state.tipoDocumento.codice
                + "/" 
                + state.confermaOrdine.codice)
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setOrdini', res.data)
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
            })
        },
        setTipoDocumento({ commit }, tipoDocumento) {
            commit('setTipoDocumento', tipoDocumento)
        },
        setConfermaOrdine({ commit }, confermaOrdine) {
            commit('setConfermaOrdine', confermaOrdine)
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
        getTipiDocumento(state) {
            return state.tipiDocumento
        },
        getTipoDocumento(state) {
            return state.tipoDocumento
        },
        getConfermaOrdine(state) {
            return state.confermaOrdine
        },
        getConfermeOrdine(state) {
            return state.confermeOrdine
        },
        getOrdini(state) {
            return state.ordini
        },
        isAuthenticated(state) {
            return state.token !== null
        }
    }
})