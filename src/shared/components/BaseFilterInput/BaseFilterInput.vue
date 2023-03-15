<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type icons from '@/shared/utils/icons'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

const emit = defineEmits(['update:modelValue', 'focus'])
const props = withDefaults(
  defineProps<{
    id: string
    name: string
    size?: 'lg' | 'md' | 'sm'
    disabled?: boolean
    readonly?: boolean
    suffix?: keyof typeof icons
    modelValue?: string | number
    iconColor?: string
    placeHolder?: string
    search?: boolean
    bgColor?: 'light' | ''
    wrapperVariant?: string
    inputVariant?: string
  }>(),
  {
    size: 'lg',
    disabled: false,
    readonly: false,
    search: false,
    bgColor: ''
  }
)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const sizeInput = computed(() => {
  switch (props.size) {
    case 'lg':
      return { height: 'h-10 md:h-11', size: 'text-base' }
    case 'md':
      return { height: 'h-10', size: 'text-sm md:text-base' }
    case 'sm':
      return { height: 'h-9', size: 'text-xs sm:text-sm' }
    default:
      return { height: 'h-10', size: 'text-sm md:text-base' }
  }
})

const disabledClass = computed(() => {
  if (props.disabled) return 'cursor-not-allowed'
  return ''
})

const suffixClass = computed(() => {
  if (props.suffix) return 'pr-10'
  return ''
})

const bgInput = computed(() => {
  if (props.bgColor === 'light') return 'bg-light'
  return 'bg-gray-light'
})

const handleFocus = () => {
  emit('focus')
}
</script>

<template>
  <div class="relative" :class="wrapperVariant">
    <input
      v-bind="$attrs"
      v-model="value"
      :disabled="disabled"
      :readonly="readonly"
      :id="id"
      class="block px-3 w-full text-dark-light font-medium rounded-xl border-none focus:outline-none placeholder:text-gray-dark focus:ring focus:ring-primary/30"
      :class="[
        disabledClass,
        suffixClass,
        sizeInput.height,
        sizeInput.size,
        bgInput,
        $slots.suffix ? 'pr-9' : '',
        search ? 'pl-9' : '',
        inputVariant
      ]"
      @focus="handleFocus"
      :placeholder="placeHolder"
    />
    <div class="absolute right-3 top-1/2 -translate-y-1/2">
      <slot name="suffix"> </slot>
    </div>
    <BaseIcon
      v-if="search"
      name="searchOutline"
      class="absolute left-3 text-dark-light top-1/2 -translate-y-1/2"
      :class="size === 'sm' ? 'w-3 h-3' : 'w-3 h-4 sm:w-4 sm:h-4'"
      viewBox="0 0 19 19"
    />
    <BaseIcon
      v-if="suffix"
      :name="suffix"
      class="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2"
      :class="iconColor"
    />
  </div>
</template>
