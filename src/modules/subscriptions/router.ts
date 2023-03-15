export const subscription = [
  {
    path: '/subscriptions',
    name: 'subscriptions',
    component: () => import('./index.vue'),
    children: [
      {
        path: '',
        name: 'subscriptions_list',
        meta: {
          title: 'subscriptions',
          breadcrumb: [{ name: 'home', path: '/' }]
        },
        component: () => import('./views/index.vue')
      },
      {
        path: 'statistics',
        name: 'subscriptions_statistics',
        meta: {
          title: 'statistics',
          breadcrumb: [
            { name: 'home', path: '/' },
            { name: 'subscriptions', path: '/subscriptions' }
          ]
        },
        component: () => import('./views/statistics.vue')
      }
    ]
  }
]
