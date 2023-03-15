import { type Router, type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { dashboard } from '@/modules/dashboard/router'
import { auth } from '@/modules/auth/router'
import { calls } from '@/modules/calls/router'
import { advertisements } from '@/modules/advertisements/router'
import { clients } from '@/modules/clients/router'
import { companies } from '@/modules/companies/router'
import { services } from '@/modules/services/router'
import { settings } from '@/modules/settings/router'
import { subscription } from '@/modules/subscriptions/router'
import { errors } from '@/modules/errors/router'
import { profile } from '@/modules/profile/router'
import { notifications } from '@/modules/notifications/router'
import { getItem } from '@/shared/utils/local_storage'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    breadcrumb?: SingleBreadcrumb[]
    isGuest?: boolean
    isPublic?: boolean
    can?: string | string[]
    layout?: 'default' | 'empty'
  }
}

const routes: readonly RouteRecordRaw[] = [
  ...auth,
  ...dashboard,
  ...calls,
  ...advertisements,
  ...clients,
  ...companies,
  ...services,
  ...settings,
  ...subscription,
  ...errors,
  ...profile,
  ...notifications
]

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach((to, _, next) => {
  const isAuthenticated = getItem('Authorization')

  const publicPages = ['/auth/login', '/auth/reset-password', '/auth/confirm', '/auth/send']
  const isGuest = publicPages.includes(to.path)
  if (!isGuest && !isAuthenticated) {
    next({ name: 'auth_login' })
  } else if (isGuest && isAuthenticated) {
    next({ name: 'dashboard' })
  } else next()
})

export default router
