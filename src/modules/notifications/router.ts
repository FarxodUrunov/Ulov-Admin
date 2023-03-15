import type { RouteRecordRaw } from 'vue-router'

export const notifications: readonly RouteRecordRaw[] = [
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('./views/index.vue')
  }
]
