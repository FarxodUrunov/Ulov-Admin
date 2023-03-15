import type { RouteRecordRaw } from 'vue-router'
import { routeGenerator } from '@/router/route-generator'

export const settings: readonly RouteRecordRaw[] = [
  {
    path: '/settings',
    name: 'settings',
    redirect: '/settings/roles',
    component: () => import('./index.vue'),
    children: [
      ...routeGenerator({
        path: 'roles',
        parent: 'settings',
        can: { list: 'role:read', show: 'user:create' },
        breadcrumb: [
          { name: 'home', path: '/' },
          { name: 'settings', path: '/settings' }
        ],
        has: { list: true, create: true }
      }),
      ...routeGenerator({
        path: 'users',
        parent: 'settings',
        can: { list: 'user:read', show: 'user:show' },
        breadcrumb: [
          { name: 'home', path: '/' },
          { name: 'settings', path: '/settings' }
        ],
        has: { list: true, show: true }
      })
    ]
  }
]
