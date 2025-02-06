import { createRouter, createWebHistory } from 'vue-router'
import BusquedaVista from "../views/BusquedaVista.vue"
import ListaProductosVista from '../views/ListaProductosVista.vue'
import InfoProductosVista from '../views/InfoProductosVista.vue'

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { path: '/', name: 'home', component: BusquedaVista },
    { path: '/lista', name: 'lista', component: ListaProductosVista },
    { path: '/info/:id', name: 'info', component: InfoProductosVista },
    { path: '/', redirect: '/lista' }
  ],
})

export default router
