<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?:
      | 'success'
      | 'secondary'
      | 'error'
      | 'waiting'
      | 'progress'
      | 'finished'
      | 'pause'
      | 'paid'
      | 'canceled'
    text?: string | number
  }>(),
  {
    variant: 'secondary',
    text: ''
  }
)

const badgeClasses = computed(() => {
  switch (props.variant) {
    case 'error':
      return 'bg-error text-white'
    case 'canceled':
      return 'bg-error text-white'
    case 'success':
      return 'bg-success text-white'
    case 'paid':
      return 'bg-success text-white'
    case 'waiting':
      return 'bg-warning text-white'
    case 'progress':
      return 'bg-blue-400 text-white'
    case 'finished':
      return 'bg-dark-light text-white'
    case 'pause':
      return 'bg-yellow text-white'
    default:
      return 'bg-blue-100 text-dark'
  }
})
</script>
<template>
  <div
    class="inline-block text-sm font-medium rounded-lg py-1 px-2 min-w-[100px] min-h-[22px] text-center"
    :class="badgeClasses"
  >
    {{ text }}
  </div>
</template>
