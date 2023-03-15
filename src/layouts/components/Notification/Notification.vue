<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
import BaseDropdown from '@/shared/components/BaseDropdown/BaseDropdown.vue'
import BaseSwitch from '@/shared/components/BaseSwitch/BaseSwitch.vue'
import NotificationItem from './NotificationItem.vue'
import type { Notification } from './types'

const { t } = useI18n({
  useScope: 'global',
  messages: {
    en: {
      showAllNotifications: 'Увидеть все уведомления'
    },
    ru: {
      showAllNotifications: 'Увидеть все уведомления'
    },
    uz: {
      showAllNotifications: 'Увидеть все уведомления'
    }
  }
})

const notifications = ref<Notification[]>([
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
  },
  {
    id: 6,
    title: 'Создать новую услугу',
    description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
    date: new Date().toString(),
    read: false
  },
  {
    id: 7,
    title: 'Создать новую услугу',
    description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
    date: new Date().toLocaleString(),
    read: false
  },
  {
    id: 8,
    title: 'Создать новую услугу',
    description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
    date: new Date().toLocaleString(),
    read: false
  },
  {
    id: 9,
    title: 'Создать новую услугу',
    description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
    date: new Date().toLocaleString(),
    read: false
  },
  {
    id: 10,
    title: 'Создать новую услугу',
    description: 'Чтобы создать новую услугу, сначала заполните всю информацию',
    date: new Date().toLocaleString(),
    read: false
  }
])
const unreadNotificationCount = ref(5)

const dontDistrub = ref(false)
</script>

<template>
  <BaseDropdown
    :items="[notifications]"
    strategy="absolute"
    placement="bottom-end"
    class="hidden md:inline-flex mr-2.5 xl:mr-0"
    tooltip-class="min-w-md"
    items-class="p-0"
  >
    <template #trigger>
      <span class="relative">
        <BaseIcon name="notification" class="w-8 h-8 text-dark" />
        <span
          class="absolute -top-1 -right-1 min-w-[20px] h-5 flex justify-center items-center bg-primary text-white text-xs rounded-full shadow-primary"
        >
          {{ unreadNotificationCount }}
        </span>
      </span>
    </template>
    <template #header>
      <div class="flex justify-between items-center py-3 px-4">
        <h3 class="text-lg font-semibold">{{ t('menu.notifications') }}</h3>
        <BaseSwitch v-model="dontDistrub" :label="t('buttons.doNotDisturb')" />
      </div>
    </template>
    <template #item="{ item }">
      <NotificationItem :item="item" />
    </template>
    <template #footer>
      <div class="py-2 px-4">
        <BaseLink to="/notifications" link>
          {{ t('showAllNotifications') }}
        </BaseLink>
      </div>
    </template>
  </BaseDropdown>
</template>
