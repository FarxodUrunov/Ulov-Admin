<script setup lang="ts">
import Circle from '@/shared/components/BaseSkeleton/components/Circle.vue'
import Paragraph from '@/shared/components/BaseSkeleton/components/Paragraph.vue'

export interface Props {
  rows?: number
  active: boolean
}

withDefaults(defineProps<Props>(), { rows: 4, active: false })
</script>

<template>
  <div data-test="sidebar" v-if="active" class="animate-pulse">
    <div class="w-72 min-h-screen flex flex-col justify-between border border-gray">
      <div>
        <div class="h-16 bg-gradient-to-r from-gray to-gray-light bg-gray w-full" />
        <ul class="flex flex-col gap-y-6 p-8">
          <li v-for="n in rows" :key="n" class="flex items-center gap-x-4">
            <Circle data-test="circle" />
            <Paragraph data-test="paragraph" :class="n % 2 === 0 ? 'w-8/12' : 'w-9/12'" />
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-y-4 p-8">
        <Paragraph data-test="paragraph" class="h-4" />
        <Paragraph data-test="paragraph" class="h-4" />
      </div>
    </div>
  </div>
  <slot v-else />
</template>
