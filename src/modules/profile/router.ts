import type { RouteRecordRaw } from 'vue-router'

export const profile: readonly RouteRecordRaw[] = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./view/index.vue')
  }
]
