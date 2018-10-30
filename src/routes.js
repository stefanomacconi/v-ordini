import Login from './components/Login'
import Ordini from './components/Ordini'
import Conferma from './components/Conferma'
import Documento from './components/Documento'
import Error from './components/Error'
import Result from './components/Result'

import store from './store/store'

export const routes = [
    { path: '/login', component: Login },
    {
        path: '/vistatura',
        component: Ordini,
        beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                store.dispatch('fetchOrdiniDaVistare').then(() => {
                    next()
                }).catch(() => {
                    store.dispatch('handleError', {
                        developerMessage: "Impossibile recuperare gli ordini da vistare, "+ 
                             + "controllare la connessione al server."
                    }) 
                })
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/', beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next('/vistatura')
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/conferma', component: Conferma, beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/documento', component: Documento, beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {
        path: '/result', name:"result", component: Result, props: true, beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
    {path: "/error", name:"error", component: Error,  props: true}  
]