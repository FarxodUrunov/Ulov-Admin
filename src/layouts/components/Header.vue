<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseBreadcrumb from '@/shared/components/BaseBreadcrumb/BaseBreadcrumb.vue'
import Search from './Search/Search.vue'
import Notification from './Notification/Notification.vue'
import LangSwitcher from './LangSwitcher.vue'
import ProfileDropdown from './ProfileDropdown.vue'

// stores
import { useMenuStore } from '@/layouts/stores/menu'
// composables
import { useHeaderBreadcrumb } from '@/layouts/composables/useHeaderBreadcrumb'

const menuStore = useMenuStore()
const { breadcrumb } = useHeaderBreadcrumb()
</script>

<template>
  <div class="sticky top-0 z-header bg-white">
    <div class="flex justify-between items-center border-b border-dark-lighter p-3 md:p-4 lg:px-6">
      <div class="flex items-center gap-4">
        <BaseButton
          variant="none"
          :icon="{ name: 'hamburger', className: 'w-6.5 h-6.5' }"
          size="sm"
          class="w-10 h-10 hover:bg-gray-light !min-h-0 lg:!hidden !p-0 !rounded-full"
          :has-default-slot="false"
          @click="menuStore.toggleSidebar"
        ></BaseButton>
        <h2 class="text-lg font-bold">AUTO REPAIR</h2>
      </div>
      <div class="flex items-center gap-3 md:gap-4 xl:gap-8">
        <Search />
        <Notification />
        <LangSwitcher />
        <ProfileDropdown
          :user="{ first_name: 'Даврон', last_name: 'Усмонов', role: 'Супер админ' }"
        />
      </div>
    </div>
    <div class="border-b border-dark-lighter py-2 px-3 md:px-4 lg:px-6">
      <BaseBreadcrumb :breadcrumb="breadcrumb" />
    </div>
  </div>
</template>
