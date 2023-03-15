<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useProgressClasses } from './useProgressClasses'
import type { ProgressSize, ProgressVariant } from './types'

const props = withDefaults(
  defineProps<{
    total: number
    current: number
    color?: ProgressVariant
    size?: ProgressSize
  }>(),
  {
    color: 'yellow',
    size: 'md'
  }
)

const { innerClasses, outerClasses, labelClasses } = useProgressClasses(toRefs(props))

const progress = computed(() => (props.current * 100) / props.total)
</script>

<template>
  <div class="w-full flex items-center">
    <div class="w-full bg-gray rounded-full" :class="outerClasses">
      <div
        class="rounded-full font-medium text-blue-100 text-center p-0.5"
        :class="progress ? innerClasses : ''"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <span :class="labelClasses" class="text-gray w-8 font-medium ml-1">{{ current }}</span>
  </div>
</template>
