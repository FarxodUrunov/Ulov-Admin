import type { RouteRecordRaw } from 'vue-router'

export const calls: readonly RouteRecordRaw[] = [
  {
    path: '/calls',
    name: 'calls',
    redirect: '/calls/companies',
    component: () => import('./index.vue'),
    children: [
      {
        path: 'companies',
        name: 'calls_companies',
        meta: {
          title: 'Companies',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'calls', path: '/calls' }
          ]
        },
        component: () => import('./views/companies.vue')
      },
      {
        path: 'statistics',
        name: 'calls_statistics',
        meta: {
          title: 'Statistics',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'calls', path: '/calls' }
          ]
        },
        component: () => import('./views/statistics.vue')
      }
    ]
  }
]
