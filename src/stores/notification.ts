import { defineStore } from 'pinia'
import { createUUID } from '@/shared/utils'
import type {
  Notification,
  PlacementTypeX,
  PlacementTypeY
} from '@/shared/components/BaseNotification/types'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: <Notification[]>[],
    placement: { x: 'end', y: 'start' } as { x: PlacementTypeX; y: PlacementTypeY }
  }),
  actions: {
    setNotification(notification: Omit<Notification, 'id'>) {
      const appendMethod = this.placement.y === 'start' ? 'unshift' : 'push'
      this.notifications[appendMethod]({
        id: createUUID(),
        type: notification.type,
        message: notification.message,
        subject: notification.subject,
        autoClose: notification.autoClose,
        duration: notification.duration,
        customRender: notification.customRender,
        customRenderProps: notification.customRenderProps
      })
    },
    removeNotification(id: Notification['id']) {
      this.notifications = this.notifications.filter((notification) => notification.id !== id)
    },
    removeAllNotifications() {
      this.notifications = []
    }
  }
})
