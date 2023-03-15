import type { RouteRecordRaw } from 'vue-router'

export const advertisements: readonly RouteRecordRaw[] = [
  {
    name: 'advertisements',
    path: '/advertisements',
    component: () => import('./views/index.vue'),
    meta: {
      title: 'advertisements',
      breadcrumb: [
        { name: 'home', path: '/' },
        { name: 'advertisements', path: '/advertisements' }
      ],
      can: 'advertisement:read'
    }
  }
]
