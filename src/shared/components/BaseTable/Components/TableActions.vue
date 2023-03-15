<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

type ActionType = {
  edit?: boolean
  delete?: boolean
  duplicate?: boolean
}

defineProps<{ action?: ActionType }>()
const emit = defineEmits(['action'])

const langSwitcher = {
  edit: 'Edit',
  delete: 'Delete',
  duplicate: 'Duplicate'
}

const handleActions = (action: string) => {
  emit('action', action)
}
</script>

<template>
  <Menu as="div" class="relative flex justify-center" v-if="action">
    <MenuButton class="px-2 rounded-full flex items-end">
      <span class="sr-only">Open options</span>
      <BaseIcon name="actionOutline" class="w-4 h-4 rotate-90 text-dark-light" />
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
        class="cursor-pointer origin-top-right absolute right-10 w-40 rounded-md bg-white shadow-dropdown z-50 text-dark-light focus:outline-none py-2"
      >
        <MenuItem v-if="action.edit" v-slot="{ active }" @click="handleActions('edit')">
          <a
            :class="[
              active ? 'bg-gray-light text-dark-light' : 'text-dark',
              'group flex items-center px-4 py-2 text-sm hover:text-dark-light'
            ]"
          >
            <BaseIcon name="editOutline" class="mr-3 h-5 w-5 text-success" />
            {{ langSwitcher.edit }}
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
            {{ langSwitcher.duplicate }}
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
            {{ langSwitcher.delete }}
          </a>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
