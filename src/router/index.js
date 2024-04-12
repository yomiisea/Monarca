import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PaginaCalendario from '../views/PaginaCalendario.vue'
import PaginaEstado from '../views/PaginaEstado.vue'
import PaginaLogin from '../views/PaginaLogin.vue'
import PaginaDiario from '../views/PaginaDiario.vue'
import PaginaInicio from '../views/PaginaInicio.vue'
import PaginaTareas from '@/views/PaginaTareas.vue'
import PaginaPendientes from '@/views/PaginaPendientes.vue'
import PaginaCategorias from '@/views/PaginaCategorias.vue'
import TareaDetalle from '@/views/TareaDetalle.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PaginaLogin',
      component: PaginaLogin
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/PaginaCalendario',
      name: 'PaginaCalendario',
      component: PaginaCalendario
    },
    {
      path: '/PaginaPendientes',
      name: 'PaginaPendientes',
      component: PaginaPendientes
    },
    {
      path: '/PaginaTareas',
      name: 'PaginaTareas',
      component: PaginaTareas
    },
    {
      path: '/PaginaEstado',
      name: 'PaginaEstado',
      component: PaginaEstado
    },
    {
      path: '/PaginaDiario',
      name: 'PaginaDiario',
      component: PaginaDiario
    },
    {
      path: '/PaginaInicio',
      name: 'PaginaInicio',
      component: PaginaInicio
    },
    {
      path: '/PaginaInicio',
      name: 'PaginaInicio',
      component: PaginaInicio
    },
    {
      path: '/PaginaCategorias',
      name: 'PaginaCategorias',
      component: PaginaCategorias
    },
    {
      path: '/tarea/:id', // Ruta con un parámetro dinámico ':id'
      name: 'TareaDetalle',
      component: TareaDetalle,
      props: true // Permitir que los parámetros de ruta se pasen como props al componente
    },
    
  ]
})

export default router
