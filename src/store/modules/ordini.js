import axios from 'axios'

const state = {
    ordini: [],
    tipiDocumento: [],
    tipoDocumento: null,
    confermeOrdine: [],
    confermaOrdine: null
}

const mutations = {
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
}

const actions = {
    fetchTipiDocumento({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
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
                resolve()
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
                reject()
            })
        })
    },
    fetchConfermeOrdine({ commit, dispatch }) {
        return new Promise((resolve, reject) => {
            axios.get('/conferma-ordine')
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setConfermeOrdine', res.data)
                dispatch('setConfermaOrdine', res.data[0])
                resolve()
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
                reject()
            })
        })
    },
    async fetchOrdiniDaVistare({ commit, dispatch, state }) {
        return new Promise((resolve, reject) => {
            axios.get('/ordine/fornitore/da-vistare/' 
                + state.tipoDocumento.codice
                + "/" 
                + state.confermaOrdine.codice)
            .then(res => {
                // eslint-disable-next-line
                console.log(res)
                commit('setOrdini', res.data)
                resolve()
            }).catch(error => {
                // eslint-disable-next-line
                console.log(error)
                dispatch('handleError', error.response.data)
                reject()
            })
        })
    },
    setTipoDocumento({ commit }, tipoDocumento) {
        commit('setTipoDocumento', tipoDocumento)
    },
    setConfermaOrdine({ commit }, confermaOrdine) {
        commit('setConfermaOrdine', confermaOrdine)
    }
}

const getters = {
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
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}