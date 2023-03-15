<script setup lang="ts">
import { computed } from 'vue'
import type { Sizes } from './types'

const props = withDefaults(
  defineProps<{
    modelValue: any
    value: string
    label?: string
    size?: 'sm' | 'md' | 'lg'
    error?: boolean
    disabled?: boolean
  }>(),
  {
    size: 'md',
    label: 'Label'
  }
)

const emit = defineEmits(['update:modelValue'])

const isDisabled: string = props.disabled ? 'cursor-not-allowed bg-gray-light' : 'cursor-pointer'

const sizes = computed<Sizes>(() => {
  const afterClass: string = 'after:rounded-full after:bg-white after:absolute'
  switch (props.size) {
    case 'sm':
      return {
        label: 'text-sm leading-3 rounded-md py-2.5 px-2',
        labelText: 'mr-6',
        radio: ['w-4 h-4 after:top-0.05 after:left-0.05 after:w-1.5 after:h-1.5', afterClass]
      }
    case 'md':
      return {
        label: 'text-base leading-4 rounded-lg py-5 px-4',
        labelText: 'mr-7',
        radio: ['w-5 h-5 right-4 after:top-1.5 after:left-1.5 after:w-2 after:h-2', afterClass]
      }
    case 'lg':
      return {
        label: 'text-lg leading-5 rounded-xl py-5 px-4',
        labelText: 'mr-8',
        radio: ['w-6 h-6 after:top-2 after:left-2 after:w-2 after:h-2', afterClass]
      }
    default:
      return {
        label: 'text-base rounded-lg py-5 px-4',
        labelText: 'mr-7',
        radio: ['w-5 h-5 after:top-1.5 after:left-1.5 after:w-2 after:h-2', afterClass, isDisabled]
      }
  }
})

const computedValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const radioSelected = computed(() => {
  return props.modelValue !== null && props.modelValue === props.value
})
</script>

<template>
  <label
    :for="label"
    class="w-full self-start relative inline-flex items-center justify-between text-gray-dark border focus-within:ring"
    :class="[
      isDisabled,
      sizes.label,
      error ? 'border-error ring-error/30' : 'border-gray-light ring-primary/30'
    ]"
  >
    <span class="flex-1 w-full truncate" :class="sizes.labelText">{{ label }}</span>
    <input
      :id="label"
      type="radio"
      name="radio"
      :value="value"
      class="absolute opacity-0"
      :class="isDisabled"
      :disabled="disabled"
      v-model="computedValue"
    />
    <span
      class="absolute rounded-full border-2"
      :class="[
        isDisabled,
        sizes.radio,
        error ? 'border-error' : 'border-primary',
        radioSelected ? 'after:block bg-primary border-none duration-300' : 'after:hidden bg-white'
      ]"
    ></span>
  </label>
</template>
