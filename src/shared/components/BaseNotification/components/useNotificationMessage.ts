import { computed } from 'vue'
import type { NotificationType } from '../types'

export interface Params {
  type: NotificationType
  autoClose: boolean
}

export function useNotificationMessage({ type }: Params) {
  const iconType = computed(() => {
    switch (type) {
      case 'warning':
        return 'warningInfo'
      case 'success':
        return 'tickCircle'
      default:
        return 'infoCircle'
    }
  })

  const iconViewBox = computed(() => {
    switch (type) {
      case 'warning':
        return '0 0 256 256'
      case 'success':
        return '0 0 20 20'
      default:
        return '0 0 24 24'
    }
  })

  const iconColor = computed(() => {
    switch (type) {
      case 'warning':
        return 'text-warning'
      case 'success':
        return 'text-success'
      case 'error':
        return 'text-error'
      default:
        return 'text-blue-300'
    }
  })

  const iconBgColor = computed(() => {
    switch (type) {
      case 'warning':
        return 'bg-warning/20'
      case 'success':
        return 'bg-success/20'
      case 'error':
        return 'bg-error/20'
      default:
        return 'bg-blue-100'
    }
  })

  return {
    iconType,
    iconViewBox,
    iconColor,
    iconBgColor
  }
}
