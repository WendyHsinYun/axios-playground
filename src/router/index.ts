import { createRouter, createWebHistory } from 'vue-router'
import AxiosBasicView from '../views/AxiosBasicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/axios-basic',
      name: 'axiosBasic',
      component: AxiosBasicView
    },
    {
      path: '/axios-plugin',
      name: 'axiosPlugin',
      component: () => import('../views/AxiosPluginView.vue')
    },
    {
      path: '/axios-instance-1',
      name: 'axiosInstance1',
      component: () => import('../views/InstanceView1.vue')
    },
    {
      path: '/axios-instance-2',
      name: 'axiosInstance2',
      component: () => import('../views/InstanceView2.vue')
    },
    {
      path: '/axios-interceptor',
      name: 'axiosInterceptor',
      component: () => import('../views/InterceptorView.vue')
    }
  ]
})

export default router
