<script setup lang="ts">
import BaseRating from '@/shared/components/BaseRating/BaseRating.vue'

withDefaults(
  defineProps<{
    ratingScore?: number
    numberOfReviews?: number
  }>(),
  {
    ratingScore: 0,
    numberOfReviews: 0
  }
)

const stringOfReviews = 'Отзывы'
</script>

<template>
  <div class="flex flex-col items-center">
    <h2 data-test="rating-score" class="font-bold text-3xl text-dark">{{ ratingScore }}</h2>
    <BaseRating :model-value="ratingScore" disabled class="mb-2 mt-1" />
    <p data-test="number-of-reviews" v-if="numberOfReviews > 0" class="text-sm text-dark">
      {{ numberOfReviews + ' ' + stringOfReviews }}
    </p>
  </div>
</template>
