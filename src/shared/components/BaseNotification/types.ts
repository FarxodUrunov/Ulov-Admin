import type { Raw } from 'vue'
export type NotificationType = 'info' | 'error' | 'success' | 'warning'
export type PlacementTypeX = 'start' | 'center' | 'end'
export type PlacementTypeY = 'start' | 'end'

export interface Notification {
  id: string | number
  type?: NotificationType
  subject?: string
  message?: string
  autoClose?: boolean
  duration?: number
  customRender?: Raw<any> // wrap component with MarkRaw
  customRenderProps?: Record<string, any> // props for customRender component
}
