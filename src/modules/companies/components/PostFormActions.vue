<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    company?: boolean
    edit?: boolean
    cancelText?: string
    confirmText?: string
    addText?: string
    isLoading?: boolean
  }>(),
  {
    modelValue: false,
    company: false,
    edit: false,
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    addText: 'Add',
    isLoading: false
  }
)

const emit = defineEmits(['clickCancel', 'submit'])

const btnShow = computed(() => (props.modelValue && props.company ? true : false))
</script>

<template>
  <div class="flex flex-wrap justify-center items-center gap-4">
    <BaseButton
      @click="emit('clickCancel')"
      data-test="cancel-button"
      class="w-full max-w-[200px]"
      outlined
    >
      {{ cancelText }}
    </BaseButton>
    <BaseButton type="submit" data-test="confirm-button" class="w-full max-w-[200px]">
      {{ confirmText }}
    </BaseButton>
    <BaseButton
      v-if="edit ? modelValue : btnShow"
      :loading="isLoading"
      class="w-full max-w-[200px]"
      @click="emit('submit')"
      >{{ addText }}</BaseButton
    >
  </div>
</template>
