<script setup lang="ts">
import { computed } from 'vue'
import type { Size, Shape } from '@/shared/components/BaseSkeleton/types'

export interface Props {
  size?: Size
  shape?: Shape
}

const props = withDefaults(defineProps<Props>(), { size: 'md', shape: 'circle' })

const sizeClass = computed(() => {
  if (props.size === 'sm') {
    return 'h-5 w-5'
  } else if (props.size === 'md') {
    return 'h-6 w-6'
  } else if (props.size === 'lg') {
    return 'h-10 w-10'
  } else if (props.size === 'xl') {
    return 'h-24 w-24'
  }
  return 'h-6 w-6'
})

const shapeClass = computed(() => {
  if (props.shape === 'circle') {
    return 'rounded-full'
  } else if (props.shape === 'square') {
    return 'rounded-md'
  }
  return 'rounded-full'
})
</script>

<template>
  <div data-test="circle" :class="[sizeClass, shapeClass]" class="bg-gray" />
</template>
