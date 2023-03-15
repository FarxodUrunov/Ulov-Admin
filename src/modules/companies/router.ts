import type { RouteRecordRaw } from 'vue-router'
import { routeGenerator } from '@/router/route-generator'

export const companies: readonly RouteRecordRaw[] = [
  {
    path: '/companies',
    name: 'companies',
    redirect: '/companies',
    component: () => import('./index.vue'),
    children: [
      {
        path: '',
        name: 'companies_list',
        meta: {
          title: 'companies',
          breadcrumb: [{ name: 'home', path: '/' }]
        },
        component: () => import('./views/companies/index.vue')
      },
      {
        path: 'show/:id',
        name: 'companies_show',
        meta: {
          title: 'Эвакуаторы',
          breadcrumb: [{ name: 'home', path: '/' }]
        },
        component: () => import('./views/companies/show.vue')
      },
      {
        path: 'users',
        name: 'companies_users',
        meta: {
          title: 'users',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'companies', path: '/companies' },
            { name: 'Users', path: '/companies/users' }
          ]
        },
        component: () => import('./views/users/index.vue')
      },
      ...routeGenerator({
        path: 'users',
        parent: 'companies',
        can: { list: 'user:read', show: 'user:show' },
        breadcrumb: [
          { name: 'home', path: '/' },
          { name: 'companies', path: '/companies' },
          { name: 'users', path: '/companies/users' },
          { name: 'Okhunjon Gaybullaev', path: '/companies/users/show/:id' }
        ],
        has: { list: true, show: true }
      }),
      {
        path: 'statistics',
        name: 'companies_statistics',
        meta: {
          title: 'statistics',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'companies', path: '/companies' }
          ]
        },
        component: () => import('./views/statistics.vue')
      }
    ]
  }
]
