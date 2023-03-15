import type { RouteRecordRaw } from 'vue-router'

export const dashboard: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./index.vue'),
    meta: {
      title: 'dashboard',
      breadcrumb: [{ name: 'home', path: '/' }]
    }
  }
]
