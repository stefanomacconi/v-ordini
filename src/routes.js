import Login from './components/Login'
import Ordini from './components/Ordini'
import Conferma from './components/Conferma'
import Documento from './components/Documento'

import store from './store'

export const routes = [
    { path: '/login', component: Login },
    {
        path: '/vistatura',
        component: Ordini,
        beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
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
    }
]