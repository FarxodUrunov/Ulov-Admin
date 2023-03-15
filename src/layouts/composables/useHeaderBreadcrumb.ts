import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { BreadcrumbItemProps } from '@/shared/components/BaseBreadcrumb/types'

export const useHeaderBreadcrumb = () => {
  const route = useRoute()

  const breadcrumb = computed<BreadcrumbItemProps[]>(() => {
    const { breadcrumb } = route.meta
    if (!breadcrumb) return []
    return breadcrumb.map((item) => ({
      ...item,
      home: item.path === '/',
      current: item.path === route.path
    }))
  })

  return { breadcrumb }
}
