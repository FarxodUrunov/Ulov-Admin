<script setup lang="ts">
import BaseProgress from '@/shared/components/BaseProgress/BaseProgress.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import type { CountInterface } from '@/shared/components/TheRatingResults/types'

withDefaults(
  defineProps<{
    total?: number
    progressCount?: CountInterface
  }>(),
  {
    total: 0,
    progressCount: () => ({
      excellent: 0,
      good: 0,
      normal: 0,
      bad: 0,
      worst: 0
    })
  }
)
</script>

<template>
  <div data-test="progress-child-classes" class="flex items-center">
    <div>
      <span class="flex items-center gap-1 mb-1" v-for="i in 5" :key="i + ' rating-results'">
        <BaseIcon name="rating" class="w-5 h-5 text-gray-dark inline-block" viewBox="-1 0 22 20" />
        <span class="text-gray-dark text-md">{{ 6 - i }}</span>
      </span>
    </div>
    <div class="w-44">
      <BaseProgress
        v-for="i in 5"
        :key="i"
        class="mx-2 mb-1"
        :current="Object.values(progressCount)[i - 1] || 0"
        color="yellow"
        :total="total"
        size="md"
      />
    </div>
  </div>
</template>
