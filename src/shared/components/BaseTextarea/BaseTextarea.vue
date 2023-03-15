<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: any
    name: string
    placeholder: string
    rows?: number
    message?: string
    success?: boolean
    error?: boolean
    disabled?: boolean
    dataTest?: string
  }>(),
  {
    rows: 5,
    dataTest: 'textarea'
  }
)
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const borderVariant = computed(() => {
  if (props.success) {
    return 'border-success focus:border-success focus:ring-success/30'
  }
  if (props.error) {
    return 'border-error focus:border-error focus:ring-error/30'
  }
  return 'border-gray-light focus:border-primary focus:ring-primary/30'
})
</script>

<template>
  <div>
    <textarea
      v-model="inputValue"
      :name="name"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :data-test="dataTest"
      class="block w-full !min-h-[120px] text-base placeholder-gray-dark bg-white rounded-lg border-1 px-4 py-2 focus:outline-none focus:ring"
      :class="[borderVariant]"
    />
    <p v-if="message" data-test="message" class="text-error text-xs mx-4 mt-1">
      {{ message }}
    </p>
  </div>
</template>
