import type { RouteRecordRaw } from 'vue-router'
import { routeGenerator } from '@/router/route-generator'

export const clients: readonly RouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'clients',
    redirect: '/clients/vehicles',
    component: () => import('./index.vue'),
    children: [
      ...routeGenerator({
        path: 'vehicles',
        parent: 'clients',
        can: { list: 'vehicle:read', show: 'vehicle:show' },
        breadcrumb: [
          { name: 'home', path: '/' },
          { name: 'clients', path: '/clients' }
        ],
        has: { list: true, show: true }
      }),
      {
        name: 'clients_vehicles_fines_show',
        path: 'vehicles/fines/:id',
        meta: {
          title: 'users',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'clients', path: '/clients' },
            { name: 'fines', path: '/clients/fines' }
          ]
        },
        component: () => import('./views/vehicles/fine.vue')
      },
      {
        path: 'users',
        name: 'clients_users',
        meta: {
          title: 'users',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'clients', path: '/clients' }
          ]
        },
        component: () => import('./views/users/index.vue')
      },
      {
        path: 'statistics',
        name: 'clients_statistics',
        meta: {
          title: 'statistics',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'clients', path: '/clients' }
          ]
        },
        component: () => import('./views/statistics.vue')
      },
      {
        path: 'settings',
        name: 'clients_settings',
        meta: {
          title: 'settings',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'clients', path: '/clients' }
          ]
        },
        component: () => import('./views/settings.vue')
      }
    ]
  }
]
