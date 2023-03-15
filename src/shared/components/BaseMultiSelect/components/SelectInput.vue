<script setup lang="ts">
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { computed } from 'vue'

const props = defineProps<{
  id: string
  name: string
  size: 'lg' | 'md' | 'sm'
  mode: 'filter' | ''
  message: string
  error: boolean
  success: boolean
  disabled: boolean
  loading: boolean
  modelValue: string
  showArrow: boolean
  open: boolean
  showClose: boolean
  label?: string
}>()
const emit = defineEmits(['update:modelValue', 'show', 'switch', 'clear'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <BaseInput
    v-if="mode !== 'filter'"
    :id="id"
    :name="name"
    :label="label"
    :success="success"
    :disabled="disabled"
    :error="error"
    :size="size"
    :readonly="true"
    :message="message"
    autocomplete="off"
    class="!cursor-default"
    label-variant="!cursor-default"
    :force-focus="open"
    v-model="value"
    @click="emit('show')"
  >
    <template #suffix>
      <BaseIcon
        v-if="showArrow"
        name="arrowBottom"
        class="w-5 h-5 text-gray-dark transition-all duration-200"
        :class="[open ? 'rotate-180' : '']"
        data-test="arrow"
        @click="emit('switch')"
      />

      <BaseIcon
        v-if="showClose"
        name="close"
        class="w-5 h-5 text-gray-dark transition-all duration-200"
        data-test="close"
        @click="emit('clear')"
      />
      <BaseIcon
        v-if="loading"
        name="loadingOutline"
        class="w-4 h-4 animate-spin text-gray"
        view-box="0 0 20 20"
      />
    </template>
  </BaseInput>
  <BaseFilterInput
    v-else
    :id="id"
    :name="name"
    :placeHolder="label"
    :readonly="true"
    :disabled="disabled"
    class="!cursor-default"
    v-model="value"
    @click="emit('show')"
  >
    <template #suffix>
      <BaseIcon
        v-if="showArrow"
        name="arrowLeft"
        class="w-4 h-4 text-primary transition-all duration-200"
        :class="[open ? 'rotate-90' : '-rotate-90']"
        @click="emit('switch')"
      />
      <BaseIcon
        v-if="showClose"
        name="close"
        class="w-4 h-4 text-gray-dark transition-all duration-200"
        data-test="close"
        @click="emit('clear')"
      />
      <BaseIcon
        v-if="loading"
        name="loadingOutline"
        class="w-4 h-4 animate-spin text-blue-300"
        view-box="0 0 20 20"
      />
    </template>
  </BaseFilterInput>
  <div
    v-if="disabled"
    class="absolute top-0 left-0 w-full h-full cursor-not-allowed z-20 rounded-xl"
  ></div>
</template>
