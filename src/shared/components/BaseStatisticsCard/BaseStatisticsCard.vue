<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import defaultRegex from '@/shared/utils/regex'

const props = defineProps<{
  title: string
  staticsNumber: number
  staticsPercent: number
  growthDescendStatus: 'arrowGrowth' | 'arrowDescend' | 'arrowUnchanged'
  isActive: boolean
}>()

const growthDescendStatusClasses = computed(() => {
  switch (props.growthDescendStatus) {
    case 'arrowGrowth':
      return 'text-teal'
    case 'arrowDescend':
      return 'text-error'
    default:
      return 'text-gray-dark'
  }
})
</script>

<template>
  <div
    class="group cursor-pointer inline-flex flex-col justify-start items-start duration-200 p-3 border-0 rounded-xl shadow-md hover:bg-blue-500"
    :class="isActive ? 'bg-blue-500' : 'bg-white'"
  >
    <p class="flex-1 overflow-hidden font-normal text-xs text-gray-dark">{{ title }}</p>
    <h2
      class="text-lg font-semibold tracking-tight group-hover:text-white mt-1.5"
      :class="isActive ? 'text-white' : 'text-dark'"
    >
      {{ defaultRegex.formatNumber(staticsNumber) }}
    </h2>
    <div class="mt-1.5 flex items-center gap-2">
      <BaseIcon
        :name="growthDescendStatus"
        :class="[growthDescendStatusClasses, 'w-4 h-4']"
        viewBox="0 0 17 16"
      />
      <h3 :class="[growthDescendStatusClasses, 'font-semibold text-base']">
        {{ staticsPercent }}%
      </h3>
    </div>
  </div>
</template>
