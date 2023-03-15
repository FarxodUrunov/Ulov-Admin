import type { RouteMeta, RouteRecordRaw } from 'vue-router'

const authMeta = (title: string): RouteMeta => ({
  title,
  isGuest: true,
  layout: 'empty'
})

export const auth: readonly RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'auth',
    redirect: '/auth/login',
    component: () => import('./index.vue'),
    children: [
      {
        path: 'login',
        name: 'auth_login',
        component: () => import('./views/login.vue'),
        meta: authMeta('Login')
      },
      {
        path: 'reset-password',
        name: 'auth_reset_password',
        component: () => import('./views/reset-password.vue'),
        meta: authMeta('Password Reset')
      },
      {
        path: 'confirm',
        name: 'auth_confirm',
        component: () => import('./views/confirm.vue'),
        meta: authMeta('Confirmation')
      },
      {
        path: 'send',
        name: 'auth_send',
        component: () => import('./views/send.vue'),
        meta: authMeta('New Password')
      }
    ]
  }
]
