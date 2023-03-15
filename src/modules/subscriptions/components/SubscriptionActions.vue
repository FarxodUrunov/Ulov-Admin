<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

defineProps<{
  action?: { edit?: boolean; delete?: boolean; duplicate?: boolean }
  color?: string
}>()

const emit = defineEmits(['action'])

const { t } = useI18n()

const handleActions = (action: 'edit' | 'duplicate' | 'delete') => {
  emit('action', action)
}
</script>

<template>
  <Menu as="div" class="relative flex justify-center" v-if="action">
    <MenuButton class="rounded-full flex items-end pb-2">
      <span class="sr-only">{{ t('buttons.openOptions') }}</span>
      <BaseIcon name="actionOutline" :class="color" class="w-5 h-5 rotate-90" />
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="cursor-pointer absolute origin-top-right top-full right-0 w-40 rounded-md bg-white shadow-dropdown z-50 text-dark-light focus:outline-none py-2"
      >
        <MenuItem v-if="action.edit" v-slot="{ active }" @click="handleActions('edit')">
          <a
            :class="[
              active ? 'bg-gray-light text-dark-light' : 'text-dark',
              'group flex items-center px-4 py-2 text-sm hover:text-dark-light'
            ]"
          >
            <BaseIcon name="editOutline" class="mr-3 h-5 w-5 text-success" />
            {{ t('buttons.edit') }}
          </a>
        </MenuItem>
        <MenuItem v-if="action.duplicate" v-slot="{ active }" @click="handleActions('duplicate')">
          <a
            :class="[
              active ? 'bg-gray-light text-dark-light' : 'text-dark',
              'group flex items-center px-4 py-2 text-sm'
            ]"
          >
            <BaseIcon name="copy" class="mr-3 h-5 w-5 text-primary" />
            {{ t('buttons.duplicate') }}
          </a>
        </MenuItem>
        <MenuItem v-if="action.delete" v-slot="{ active }" @click="handleActions('delete')">
          <a
            :class="[
              active ? 'bg-gray-light text-dark-light' : 'text-dark',
              'group flex items-center px-4 py-2 text-sm'
            ]"
          >
            <BaseIcon name="deleteOutline" class="mr-3 h-5 w-5 text-error" />
            {{ t('buttons.delete') }}
          </a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
