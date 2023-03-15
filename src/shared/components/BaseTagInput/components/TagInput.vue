<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

const props = withDefaults(
  defineProps<{
    id: string
    name: string
    modelValue: string
    keyValue: string
    tagValues: Array<any>
    isFocused: boolean
    label?: string
    size?: 'lg' | 'md' | 'sm'
    error?: boolean
    success?: boolean
    disabled?: boolean
    message?: string
    readonly?: boolean
  }>(),
  {
    size: 'lg',
    error: false,
    success: false,
    disabled: false,
    readonly: false
  }
)
const emit = defineEmits(['update:modelValue', 'select'])

const inputRef = ref()

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
      return {
        height: 'min-h-10  sm:min-h-12 md:min-h-14',
        size: 'text-xs sm:text-sm md:text-base'
      }
    case 'md':
      return { height: 'min-h-10 sm:min-h-12', size: 'text-xs sm:text-sm' }
    case 'sm':
      return { height: 'min-h-10', size: 'text-xs' }
    default:
      return { height: 'min-h-10 sm:min-h-12', size: 'text-xs sm:text-sm' }
  }
})

const inputSuccessErrorClass = computed(() => {
  if (props.error) return `border-error ${props.isFocused ? 'ring-error/30 ring-2' : ''}`
  if (props.success) return `border-success ${props.isFocused ? 'ring-success/30 ring-2' : ''}`
  if (!props.error && !props.success)
    return ` ${props.isFocused ? 'border-primary/60 ring-primary/30 ring-2' : 'border-gray-light'}`
  return ''
})

const handleContainerClick = () => {
  inputRef.value?.focus()
}
</script>

<template>
  <div
    class="w-full border flex flex-row flex-wrap rounded-xl relative pt-3"
    :class="[sizeInput.height, inputSuccessErrorClass]"
    @click="handleContainerClick"
    data-test="border"
  >
    <div
      v-if="disabled"
      class="absolute w-full h-full left-0 top-0 rounded-xl cursor-not-allowed"
      data-test="disable"
    ></div>
    <label
      class="w-full absolute left-1 text-gray-dark cursor-text truncate duration-150 z-10 origin-[0_0] px-4"
      :class="[
        sizeInput.size,
        isFocused || value || tagValues.length
          ? ' top-3 -translate-y-3 scale-75'
          : ' top-1/2 -translate-y-1/2 '
      ]"
      :for="id"
    >
      {{ label }}
    </label>

    <div class="flex flex-wrap gap-2 m-2" data-test="list">
      <span
        v-for="(tag, index) in tagValues"
        :key="index"
        class="bg-blue-100 px-2 rounded max-w-[200px] shrink-0 h-fit flex justify-between items-center gap-2"
      >
        <span class="truncate text-sm">{{ tag[keyValue] }}</span>
        <BaseIcon
          name="close"
          class="h-3 w-3 cursor-pointer"
          :data-test="index"
          @click="emit('select', tag)"
        />
      </span>
      <input
        type="text"
        :name="name"
        :id="id"
        :readonly="readonly"
        :disabled="disabled"
        class="px-2 mb-1 min-w-[4px] max-w-[80px] rounded-xl text-sm h-5 appearance-none text-dark bg-white border-none focus:outline-none focus:ring-0"
        ref="inputRef"
        autocomplete="off"
        v-model="value"
      />
    </div>
  </div>
  <p v-if="error" class="text-error text-xs mt-1 font-normal ml-4">{{ message }}</p>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(10px, 0);
}

.fade-leave-active {
  position: relative;
}
</style>
