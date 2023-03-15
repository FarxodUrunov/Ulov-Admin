<script setup lang="ts">
import { computed } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
  }>(),
  {
    size: 'md'
  }
)
const emit = defineEmits(['update:modelValue'])

const switchValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const switchVariant = computed(() => {
  const sizeStyle = [
    switchValue.value ? 'bg-primary' : 'bg-gray-dark',
    'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
  ]
  switch (props.size) {
    case 'sm':
      sizeStyle.push('h-5 w-9')
      break
    case 'md':
      sizeStyle.push('h-6 w-11')
      break
    case 'lg':
      sizeStyle.push('h-8 w-16')
      break
  }
  return sizeStyle
})

const switchChildVariant = computed(() => {
  const sizeStyle = [
    'pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out'
  ]
  switch (props.size) {
    case 'sm':
      sizeStyle.push(switchValue.value ? 'translate-x-4' : 'translate-x-0', 'h-4 w-4')
      break
    case 'md':
      sizeStyle.push(switchValue.value ? 'translate-x-5' : 'translate-x-0', 'h-5 w-5')
      break
    case 'lg':
      sizeStyle.push(switchValue.value ? 'translate-x-8' : 'translate-x-0', 'h-7 w-7')
      break
  }
  return sizeStyle
})
</script>

<template>
  <SwitchGroup as="div" class="flex items-center select-none">
    <SwitchLabel
      v-if="label"
      data-test="label"
      class="text-sm text-dark-light mr-2"
      :passive="disabled"
    >
      {{ label }}
    </SwitchLabel>
    <div data-test="false" class="inline-flex w-auto" :class="{ 'cursor-not-allowed': disabled }">
      <Switch
        v-model="switchValue"
        data-test="switch"
        :class="[...switchVariant, disabled && 'pointer-events-none']"
      >
        <span aria-hidden="true" :class="switchChildVariant" />
      </Switch>
    </div>
  </SwitchGroup>
</template>
