import Login from './components/Login'
import Ordini from './components/Ordini'

import store from './store'

export const routes = [
    { path: '/login', component: Login },
    {
        path: '/',
        component: Ordini,
        beforeEnter(to, from, next) {
            if (store.getters.getToken) {
                next()
            } else {
                next('/login')
            }
        }
    },
]