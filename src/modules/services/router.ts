import type { RouteRecordRaw } from 'vue-router'
import { routeGenerator } from '@/router/route-generator'

export const services: readonly RouteRecordRaw[] = [
  {
    path: '/services',
    name: 'services',
    redirect: '/services/management',
    component: () => import('./index.vue'),
    children: [
      ...routeGenerator({
        path: 'management',
        parent: 'services',
        can: { list: 'management:read', show: 'management:create' },
        breadcrumb: [
          { name: 'home', path: '/' },
          { name: 'services', path: '/services' }
        ],
        has: { list: true, show: true }
      }),
      {
        path: 'settings',
        name: 'services_settings',
        meta: {
          title: 'services_settings',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'services', path: '/services' }
          ]
        },
        component: () => import('./views/settings.vue')
      },
      {
        path: 'statistics',
        name: 'services_statistics',
        meta: {
          title: 'statistics',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'services', path: '/services' }
          ]
        },
        component: () => import('./views/statistics.vue')
      }
    ]
  }
]
