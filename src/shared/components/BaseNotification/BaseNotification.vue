<script setup lang="ts">
import NotificationMessage from './components/NotificationMessage.vue'
import { useNotification } from './useNotification'
import type { Notification, PlacementTypeX, PlacementTypeY } from './types'

const props = withDefaults(
  defineProps<{
    notifications: Notification[]
    placementX?: PlacementTypeX
    placementY?: PlacementTypeY
  }>(),
  {
    placementX: 'end',
    placementY: 'start'
  }
)
const emit = defineEmits(['close'])

const { XPositionVariant, YPositionVariant, translateVariant } = useNotification({
  placementX: props.placementX,
  placementY: props.placementY
})

const handleMessageClose = (id: Notification['id']) => {
  emit('close', id)
}
</script>

<template>
  <div
    data-test="position"
    class="fixed z-notification"
    :class="[XPositionVariant, YPositionVariant]"
  >
    <TransitionGroup
      name="notification"
      moveClass="duration-300"
      enterActiveClass="duration-300"
      leaveActiveClass="duration-300"
      enterToClass="opacity-100"
      leaveFromClass="opacity-100"
      :enterFromClass="translateVariant"
      :leaveToClass="translateVariant"
    >
      <div v-for="(notification, index) in notifications" :key="notification.id">
        <NotificationMessage
          :style="{ zIndex: index + 1 }"
          :id="notification.id"
          :type="notification.type"
          :message="notification.message"
          :subject="notification.subject"
          :auto-close="notification.autoClose"
          :duration="notification.duration"
          @close="handleMessageClose"
        >
          <component
            v-if="notification.customRender"
            :is="notification.customRender"
            v-bind="notification.customRenderProps"
          />
        </NotificationMessage>
      </div>
    </TransitionGroup>
  </div>
</template>
