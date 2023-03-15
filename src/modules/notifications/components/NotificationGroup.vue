<script setup lang="ts">
import { ref } from 'vue'
import NotificationItem from '@/layouts/components/Notification/NotificationItem.vue'
import type { Notification } from '@/layouts/components/Notification/types'

const data = ref<Array<{ id: number; month: string; notifications: Notification[] }>>([
  {
    id: 1,
    month: 'Сентабрь',
    notifications: [
      {
        id: 1,
        title: 'Создать новую услугу',
        description:
          'Чтобы создать новую услугу, сначала заполните всю информацию Чтобы создать новую услугу, сначала заполните всю информацию Чтобы создать новую услугу, сначала заполните всю информациюЧтобы создать новую услугу, сначала заполните всю информацию',
        date: new Date().toLocaleString(),
        read: true
      }
    ]
  },
  {
    id: 2,
    month: 'Август',
    notifications: [
      {
        id: 1,
        title: 'Создать новую услугу',
        description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
        date: new Date().toLocaleString(),
        read: true
      },
      {
        id: 2,
        title: 'Создать новую услугу',
        description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
        date: new Date().toLocaleString(),
        read: false
      },
      {
        id: 3,
        title: 'Создать новую услугу',
        description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
        date: new Date().toLocaleString(),
        read: true
      },
      {
        id: 4,
        title: 'Создать новую услугу',
        description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
        date: new Date().toLocaleString(),
        read: false
      },
      {
        id: 5,
        title: 'Создать новую услугу',
        description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
        date: new Date().toLocaleString(),
        read: true
      }
    ]
  }
])
</script>

<template>
  <div
    data-test="notification-month"
    v-for="item in data"
    :key="item.id"
    class="bg-white max-w-4xl mt-4 p-3 md:p-5 lg:p-7 rounded-xl"
  >
    <h2 class="text-xl font-bold text-dark mb-4">{{ item.month }}</h2>
    <NotificationItem
      v-for="notification in item.notifications"
      :key="notification.id"
      :item="notification"
      class="bg-light"
      persistent-close
    />
  </div>
</template>
