<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import type { CardActions, CardActionPermissions } from './types'

defineProps<{
  title?: string
  actions?: CardActionPermissions
  noPadding?: boolean
}>()
const emit = defineEmits(['actions'])

const handleActions = (action: CardActions) => {
  emit('actions', action)
}
</script>

<template>
  <div
    class="flex justify-start items-start bg-white rounded-xl shadow-sm"
    :class="{ 'p-5 md:p-6 xl:p-8': !noPadding }"
  >
    <div class="w-full flex-1 mr-2 lg:mr-4">
      <slot name="header">
        <h3 v-if="title" data-test="header" class="text-xl md:text-2xl font-bold mb-3">
          {{ title }}
        </h3>
      </slot>
      <slot />
    </div>
    <div v-if="actions" data-test="actions" class="flex gap-1">
      <BaseButton
        v-if="actions.edit"
        data-test="actions-edit"
        variant="none"
        class="w-8 h-8 !min-h-0 !p-0"
        :icon="{ name: 'editOutline', className: 'w-6 h-6 text-success' }"
        size="sm"
        :has-default-slot="false"
        @click="handleActions('edit')"
      />
      <BaseButton
        v-if="actions.delete"
        data-test="actions-delete"
        variant="none"
        class="w-8 h-8 !min-h-0 !p-0"
        :icon="{ name: 'deleteOutline', className: 'w-6 h-6 text-error' }"
        size="sm"
        :has-default-slot="false"
        @click="handleActions('delete')"
      />
    </div>
  </div>
</template>
