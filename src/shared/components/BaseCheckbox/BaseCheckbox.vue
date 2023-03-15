<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: any
  id: string
  disabled?: boolean
  label?: string
  labelVariant?: string
  indeterminate?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const baseStyle = computed(() => {
  return [
    props.disabled
      ? 'text-gray border-0'
      : 'text-primary border-2 border-dark-light focus-visible:ring focus-visible:ring-primary/30'
  ]
})
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      v-model="value"
      type="checkbox"
      class="inline-flex w-5 h-5 cursor-pointer rounded-md !ring-offset-0 focus:outline-none focus:ring-0 border-1 border-gray-dark bg-white"
      :class="baseStyle"
      :indeterminate="indeterminate"
      :disabled="disabled"
    />
    <label
      v-if="label"
      :for="id"
      class="cursor-pointer select-none ml-2"
      :class="labelVariant || 'text-black text-sm'"
    >
      {{ label }}
    </label>
  </div>
</template>
