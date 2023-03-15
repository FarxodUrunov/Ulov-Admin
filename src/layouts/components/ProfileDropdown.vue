<script setup lang="ts">
import { type RouteLocationRaw, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseDropdown from '@/shared/components/BaseDropdown/BaseDropdown.vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { useAuthStore } from '@/modules/auth/store/auth'

interface SingleItem {
  id: string
  icon: 'profileOutline' | 'notificationOutline' | 'logoutOutline'
  color: string
  to?: RouteLocationRaw
}

defineProps<{
  user: {
    first_name: string
    last_name: string
    role: string
  }
}>()

const router = useRouter()
const { t } = useI18n()

const store = useAuthStore()
const { logout } = store

const items: SingleItem[] = [
  {
    id: 'menu.profile',
    icon: 'profileOutline',
    color: 'w-6 h-6 text-gray-dark',
    to: '/profile'
  },
  {
    id: 'menu.notifications',
    icon: 'notificationOutline',
    color: 'w-6 h-6 text-gray-dark',
    to: '/notifications'
  },
  {
    id: 'buttons.logout',
    icon: 'logoutOutline',
    color: 'w-6 h-6 text-gray-dark'
  }
]

const handleClick = async (item: SingleItem) => {
  if (item.to) {
    await router.push(item.to)
  } else if (item.id === 'buttons.logout') {
    logout()
  }
}
</script>

<template>
  <BaseDropdown
    :items="[items]"
    strategy="absolute"
    placement="bottom-end"
    tooltip-class="min-w-[180px]"
    items-class="py-1 px-2"
  >
    <template #trigger>
      <span class="hidden xl:flex flex-col text-right">
        <span>{{ user.first_name }} {{ user.last_name }}</span>
        <span class="font-normal text-sm" aria-label="role">{{ user.role }}</span>
      </span>
      <span
        class="w-10 h-10 flex justify-center items-center rounded-full bg-gray-light xl:ml-2 mr-1"
      >
        <BaseIcon name="profile" class="w-6 h-6 text-gray-dark" />
      </span>
      <BaseIcon name="arrowBottom" class="hidden xl:flex w-6 h-6 text-primary" />
    </template>
    <template #item="{ item }: { item: SingleItem }">
      <BaseButton
        class="w-full hover:bg-gray-light !min-h-0 !text-base !font-normal"
        variant="none"
        size="sm"
        :icon="{ name: item.icon, position: 'left', className: item.color }"
        :centered="false"
        @click="handleClick(item)"
      >
        {{ t(item.id) }}
      </BaseButton>
    </template>
  </BaseDropdown>
</template>
