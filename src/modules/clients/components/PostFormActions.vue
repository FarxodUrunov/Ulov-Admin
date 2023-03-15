<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'

withDefaults(
  defineProps<{
    cancelText?: string
    confirmText?: string
    fullWidth?: boolean
    hideCancel?: boolean
    hideConfirm?: boolean
  }>(),
  {
    cancelText: 'Cancel',
    confirmText: 'Confirm'
  }
)
const emit = defineEmits(['cancel'])
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-4">
    <BaseButton
      v-if="!hideCancel"
      data-test="cancel-button"
      class="w-full"
      :class="{ 'max-w-[200px]': !fullWidth }"
      outlined
      @click="emit('cancel')"
    >
      {{ cancelText }}
    </BaseButton>
    <BaseButton
      v-if="!hideConfirm"
      type="submit"
      data-test="confirm-button"
      class="w-full"
      :class="{ 'max-w-[200px]': !fullWidth }"
    >
      {{ confirmText }}
    </BaseButton>
  </div>
</template>
