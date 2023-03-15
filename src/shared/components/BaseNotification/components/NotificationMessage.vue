<script setup lang="ts">
import { onMounted } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import { useNotificationMessage } from './useNotificationMessage'
import type { Notification, NotificationType } from '@/shared/components/BaseNotification/types'

const props = withDefaults(
  defineProps<{
    id: Notification['id']
    type?: NotificationType
    subject?: string
    message?: string
    autoClose?: boolean
    duration?: number
  }>(),
  {
    type: 'info',
    autoClose: true,
    duration: 4000
  }
)
const emit = defineEmits(['close'])

const { iconType, iconViewBox, iconColor, iconBgColor } = useNotificationMessage({
  type: props.type,
  autoClose: props.autoClose
})

const handleClose = () => {
  emit('close', props.id)
}

const closeNotificationTime = () => {
  if (props.autoClose) {
    setTimeout(() => {
      emit('close', props.id)
    }, props.duration)
  }
}

onMounted(() => {
  closeNotificationTime()
})
</script>

<template>
  <div class="relative min-w-[280px] max-w-sm bg-white rounded-lg m-2 sm:m-4 p-2 sm:p-3 shadow-md">
    <div class="flex items-center">
      <div class="flex-1 flex items-center">
        <slot>
          <span
            data-test="type-icon"
            :class="[iconBgColor, 'inline sm:p-2 p-1 sm:rounded-xl rounded-lg']"
          >
            <BaseIcon :name="iconType" :viewBox="iconViewBox" :class="[iconColor, 'w-5 h-5']" />
          </span>
          <div class="flex-1 text-dark px-3">
            <h3
              v-if="subject"
              data-test="subject"
              class="text-base font-semibold line-clamp-1 mb-0.5"
            >
              {{ subject }}
            </h3>
            <p v-if="message" data-test="message" class="text-sm font-medium line-clamp-3">
              {{ message }}
            </p>
          </div>
        </slot>
      </div>
      <BaseButton
        v-if="!autoClose"
        variant="none"
        size="sm"
        class="w-7 h-7 hover:bg-gray-light rounded-md !p-0 !min-h-0"
        @click="handleClose"
      >
        <BaseIcon name="close" class="w-5 h-5 text-gray-dark duration-300 group-hover:text-dark" />
      </BaseButton>
    </div>
  </div>
</template>
