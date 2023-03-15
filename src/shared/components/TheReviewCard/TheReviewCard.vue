<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat } from '@vueuse/core'
import BaseRating from '@/shared/components/BaseRating/BaseRating.vue'
import BaseAvatar from '@/shared/components/BaseAvatar/BaseAvatar.vue'
import type { ReviewCardProps } from './types'

const props = withDefaults(
  defineProps<{
    fullName: ReviewCardProps['fullName']
    description: ReviewCardProps['description']
    rating: ReviewCardProps['rating']
    date: ReviewCardProps['date']
    vehicleModel?: ReviewCardProps['vehicleModel']
    avatar?: ReviewCardProps['avatar']
  }>(),
  {
    vehicleModel: '',
    avatar: ''
  }
)

const dateFormatted = computed(() => {
  return useDateFormat(props.date, 'DD.MM.YYYY').value
})
</script>

<template>
  <div class="p-4 bg-light rounded-lg">
    <div
      class="flex sm:flex-row sm:justify-between sm:gap-0 sm:text-start gap-2 flex-col items-center text-center"
    >
      <div class="flex sm:flex-row flex-col items-center sm:gap-4 gap-2">
        <BaseAvatar :src="avatar" rounded alt="avatar" size="md" />
        <div>
          <h2 data-test="fullName" class="font-medium text-sm text-dark">{{ fullName }}</h2>
          <p data-test="vehicleModel" class="text-0.5xs text-dark-light">{{ vehicleModel }}</p>
        </div>
      </div>
      <div class="sm:text-right">
        <BaseRating :modelValue="rating" disabled />
        <p data-test="date" class="text-0.5xs text-dark-light sm:mt-0.5 mt-1">
          {{ dateFormatted }}
        </p>
      </div>
    </div>
    <p data-test="description" class="mt-3 text-sm text-dark sm:text-start text-center">
      {{ description }}
    </p>
  </div>
</template>
