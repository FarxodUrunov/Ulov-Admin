<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'
import BaseNotification from '@/shared/components/BaseNotification/BaseNotification.vue'

const route = useRoute()
const notificationStore = useNotificationStore()

const layout = computed(() => {
  const metaLayout = route.meta.layout || 'default'
  return metaLayout.charAt(0).toUpperCase() + metaLayout.slice(1) + 'Layout'
})
</script>

<template>
  <component :is="layout" />
  <BaseNotification
    :placement-x="notificationStore.placement.x"
    :placement-y="notificationStore.placement.y"
    :notifications="notificationStore.notifications"
    @close="notificationStore.removeNotification"
  />
</template>
