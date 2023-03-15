<script setup lang="ts">
import RatingReviews from './components/TheRatingResultsReviews.vue'
import RatingProgress from './components/TheRatingResultsProgress.vue'
import type { RatingFindResponse } from './types'

withDefaults(
  defineProps<{
    rating?: RatingFindResponse
  }>(),
  {
    rating: () => ({
      total: 0,
      rating: 0,
      count: { excellent: 0, good: 0, normal: 0, bad: 0, worst: 0 }
    })
  }
)
</script>

<template>
  <div data-test="parent-classes" class="flex flex-wrap justify-center gap-5">
    <RatingReviews :ratingScore="rating.rating" :numberOfReviews="rating.total" />
    <RatingProgress :total="rating.total" :progressCount="rating.count" />
  </div>
</template>
