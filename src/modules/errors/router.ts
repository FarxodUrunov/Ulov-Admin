import type { RouteMeta, RouteRecordRaw } from 'vue-router'

const errorsMeta = (title: string): RouteMeta => ({
  title,
  isPublic: true,
  layout: 'empty'
})

export const errors: readonly RouteRecordRaw[] = [
  {
    path: '/400',
    name: 'error_400',
    meta: errorsMeta('error_400'),
    component: () => import('./views/index.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: errorsMeta('error_401'),
    component: () => import('./views/index.vue')
  },
  {
    path: '/403',
    name: 'error_403',
    meta: errorsMeta('error_403'),
    component: () => import('./views/index.vue')
  },
  {
    path: '/404',
    name: 'error_404',
    meta: errorsMeta('error_404'),
    component: () => import('./views/index.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: errorsMeta('error_500'),
    component: () => import('./views/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'error_404',
    meta: errorsMeta('error_404'),
    component: () => import('./views/index.vue')
  }
]
