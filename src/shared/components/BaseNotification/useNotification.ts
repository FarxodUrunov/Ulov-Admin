import { computed } from 'vue'
import type { PlacementTypeX, PlacementTypeY } from './types'

interface NotificationParams {
  placementX: PlacementTypeX
  placementY: PlacementTypeY
}

export function useNotification({ placementX, placementY }: NotificationParams) {
  const XPositionVariant = computed(() => {
    switch (placementX) {
      case 'start':
        return 'left-0'
      case 'end':
        return 'right-0'
      default:
        return 'left-1/2 -translate-x-1/2'
    }
  })

  const YPositionVariant = computed(() => {
    switch (placementY) {
      case 'start':
        return 'top-0'
      default:
        return 'bottom-0'
    }
  })

  const translateVariant = computed(() => {
    if (placementX === 'start') {
      return '-translate-x-[110%]'
    } else if (placementX === 'end') {
      return 'translate-x-[110%]'
    } else if (placementX === 'center' && placementY === 'start') {
      return '-translate-y-[130%]'
    } else {
      return 'translate-y-[130%]'
    }
  })

  return {
    XPositionVariant,
    YPositionVariant,
    translateVariant
  }
}
