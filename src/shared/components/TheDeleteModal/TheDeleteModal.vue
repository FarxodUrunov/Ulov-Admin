<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'

const props = withDefaults(
  defineProps<{
    modelValue: any
    headerText?: string
    bodyText?: string
    cancelText?: string
    confirmText?: string
  }>(),
  {
    headerText: 'Удалить',
    bodyText: 'Вы действительно хотите удалить этот аккаунт'
  }
)
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const modalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <BaseModal
    v-model="modalOpen"
    :header-text="headerText"
    confirm-variant="error"
    header-centered
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    @cancel="emit('cancel')"
    @confirm="emit('confirm')"
  >
    <template #body>
      <slot>
        <p class="font-semibold text-dark-light">{{ bodyText }}</p>
      </slot>
    </template>
  </BaseModal>
</template>
