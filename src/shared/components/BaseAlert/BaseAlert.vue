<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

const props = withDefaults(
  defineProps<{
    title: string
    type?: 'info' | 'success' | 'warning' | 'error'
  }>(),
  {
    type: 'error'
  }
)

const iconProps = computed<{
  name: 'infoCircle' | 'tickCircle' | 'warningInfo'
  className: string
  viewBox: string
}>(() => {
  switch (props.type) {
    case 'info':
      return {
        name: 'infoCircle',
        className: 'text-secondary w-14 h-14',
        viewBox: '0 0 24 24'
      }
    case 'success':
      return {
        name: 'tickCircle',
        className: 'text-success w-12 h-12 mb-1',
        viewBox: '0 0 20 20'
      }
    case 'warning':
      return {
        name: 'warningInfo',
        className: 'text-warning w-14 h-14',
        viewBox: '0 0 256 256'
      }
    default:
      return {
        name: 'warningInfo',
        className: 'text-error w-14 h-14',
        viewBox: '0 0 256 256'
      }
  }
})
</script>

<template>
  <div class="py-4 flex flex-col justify-center items-center text-center">
    <BaseIcon :name="iconProps.name" :class="iconProps.className" :viewBox="iconProps.viewBox" />
    <span data-test="title" class="font-medium">{{ title }}</span>
  </div>
</template>
