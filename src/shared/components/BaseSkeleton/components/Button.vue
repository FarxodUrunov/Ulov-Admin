<script setup lang="ts">
import { computed } from 'vue'
import type { Size } from '@/shared/components/BaseSkeleton/types'

const props = withDefaults(defineProps<{ size?: Size }>(), { size: 'sm' })

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'w-28 h-9'
  else if (props.size === 'md') return 'w-36 h-10'
  else if (props.size === 'lg') return 'w-40 h-11'
  else if (props.size === 'xl') return 'w-44 h-12'
  return 'w-28 h-9'
})
</script>

<template>
  <div :data-test="size" :class="sizeClass" class="bg-gray rounded-md" />
</template>
