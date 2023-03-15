<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type icons from '@/shared/utils/icons'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { useFocus } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    id: string
    name: string
    modelValue: any
    type?: 'text' | 'number' | 'tel' | 'email' | 'password'
    label?: string
    size?: 'lg' | 'md' | 'sm'
    autocomplete?: 'on' | 'off'
    wrapperVariant?: string
    labelVariant?: string
    suffix?: keyof typeof icons
    error?: boolean
    success?: boolean
    disabled?: boolean
    message?: string
    readonly?: boolean
    iconColor?: string
    forceFocus?: boolean
    center?: boolean
  }>(),
  {
    type: 'text',
    size: 'lg',
    autocomplete: 'on',
    error: false,
    success: false,
    disabled: false,
    readonly: false,
    forceFocus: false
  }
)
const emit = defineEmits(['update:modelValue', 'click'])

const baseInput = ref<HTMLInputElement | null>(null)
const { focused } = useFocus(baseInput)

const value = computed({
  get() {
    if (props.type === 'tel') {
      if (props.modelValue) {
        return props.modelValue
      } else {
        return '+998'
      }
    } else {
      return props.modelValue
    }
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const inputClass = computed(() => {
  if (props.error) return 'border-error'
  if (props.success) return 'border-success'
  if (!props.error && !props.success) return 'border-gray-light'
  return ''
})

const sizeInput = computed(() => {
  switch (props.size) {
    case 'lg':
      return { height: 'h-14', size: 'text-base' }
    default:
      return { height: 'h-12 sm:h-14', size: 'text-sm sm:text-base' }
  }
})

const disabledClass = computed(() => {
  if (props.disabled) return '!cursor-not-allowed'
  return ''
})

const focusClass = computed(() => {
  let inputFocus = 'focus:border-primary/60 focus:ring-primary/30'
  if (props.success) {
    inputFocus = 'focus:border-success focus:ring-success/30'
  }
  if (props.error) {
    inputFocus = 'focus:border-error focus:ring-error/30'
  }
  if (props.forceFocus) {
    inputFocus = `ring-2 ${inputFocus.replace(new RegExp('focus:', 'g'), '')} ${inputFocus}`
  }
  const focusedClass = {
    label: 'top-4 -translate-y-3 scale-75',
    input: inputFocus
  }
  const notFocusedClass = {
    label: 'top-[48%] -translate-y-1/2 scale-100',
    input: inputFocus
  }
  return props.forceFocus || focused.value || value.value ? focusedClass : notFocusedClass
})

const suffixClass = computed(() => {
  if (props.suffix) return 'pr-10'
  return ''
})

const isNumber = (event: KeyboardEvent) => {
  if (props.type === 'tel') {
    const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+']
    const keyPressed: string = event.key
    if (!keysAllowed.includes(keyPressed)) {
      event.preventDefault()
    }
  }
}

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div :class="wrapperVariant">
    <div class="relative">
      <input
        v-bind="$attrs"
        ref="baseInput"
        v-model="value"
        :id="id"
        :name="name"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :class="[
          'block appearance-none w-full bg-white text-sm text-dark font-medium rounded-xl border px-4 focus:outline-none focus:ring-2',
          focusClass.input,
          inputClass,
          disabledClass,
          suffixClass,
          sizeInput.height,
          (success || suffix) && !$slots.suffix && 'pr-10',
          $slots.suffix && 'pr-14',
          center ? 'text-center' : 'pb-1 pt-3'
        ]"
        @keypress="isNumber($event)"
        @click="handleClick"
      />
      <label
        :for="id"
        :class="[
          'w-full absolute left-1 text-gray-dark cursor-text  truncate duration-150 z-10 origin-[0_0] px-4',
          focusClass.label,
          disabledClass,
          sizeInput.size,
          labelVariant,
          (success || suffix) && !$slots.suffix && 'pr-10',
          $slots.suffix && 'pr-14'
        ]"
      >
        {{ label }}
      </label>
      <div class="absolute right-3 top-1/2 -translate-y-1/2">
        <slot name="suffix">
          <BaseIcon v-if="suffix" :name="suffix" class="w-5 h-5" :class="iconColor" />
          <BaseIcon
            v-else-if="!suffix && success"
            name="checkOutline"
            viewBox="0 0 14 10"
            class="w-3 h-3 md:scale-100 text-success"
          />
        </slot>
      </div>
    </div>
    <p v-if="error" class="text-error text-xs font-normal mx-4 mt-1">
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}
input[type='number'] {
  appearance: textfield;
}
</style>
