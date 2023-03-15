<script setup lang="ts">
import { computed } from 'vue'
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import { useDateFormat } from '@vueuse/core'
import { dateDiffInDays } from '@/shared/utils'

const props = withDefaults(
  defineProps<{
    date?: string
    img?: string
    title?: string
    total?: number
    description?: string
  }>(),
  {
    date: '',
    img: '',
    title: '',
    total: 0,
    description: 'Информации не обнаружено'
  }
)

const writingDays = 'дней'
const finishedDays = 'Закончен'

const circumference = 30 * 2.33 * Math.PI

const days = computed(() => {
  return dateDiffInDays(new Date(), new Date(props.date))
})

const percent = computed(() => (days.value * 100) / props.total)

const currentProgress = computed(() => {
  return circumference - (percent.value / 100) * circumference
})

const percentColorClass = computed(() => {
  if (percent.value < 51 && percent.value > 17) return 'text-warning'

  if (percent.value < 17 && percent.value > 0) return 'text-error'

  if (percent.value > 51) return 'text-success'

  return 'text-transparent'
})

const dateFormatted = useDateFormat(new Date(props.date), 'DD.MM.YYYY')
</script>

<template>
  <div class="w-full flex items-start gap-4 p-3 border-0 rounded-xl shadow-md bg-white">
    <div class="w-full flex-1">
      <div class="mb-1">
        <span class="w-11 h-11 inline-flex justify-center items-center bg-blue-100 rounded-full">
          <BaseImage :src="img" :alt="title" class="w-6 h-6" />
        </span>
        <h3 data-test="title" class="text-dark font-medium mt-1">{{ title }}</h3>
      </div>
      <div class="line-clamp-2">
        <h6
          data-test="description"
          class="w-full relative text-sm font-medium text-dark-light"
          :title="description"
        >
          {{ description }}
        </h6>
      </div>
    </div>
    <div class="text-center">
      <div class="relative">
        <svg class="w-20 h-20 transform -rotate-90">
          <circle
            class="text-gray-light"
            stroke-width="7"
            stroke="currentColor"
            fill="transparent"
            r="35"
            cx="40"
            cy="40"
          />
          <circle
            :class="percentColorClass"
            stroke-width="7"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="currentProgress"
            stroke-linecap="round"
            stroke="currentColor"
            fill="transparent"
            r="35"
            cx="40"
            cy="40"
          />
        </svg>
        <span
          v-if="date"
          data-test="days"
          :class="[
            `${percent < 0 ? 'text-error' : 'text-dark'}`,
            'absolute text-center top-8 left-3 w-14 h-4 overflow-hidden text-xs'
          ]"
        >
          {{ percent < 0 ? finishedDays : days + ' ' + writingDays }}
        </span>
      </div>
      <p
        v-if="description"
        data-test="end-date"
        class="text-0.5xs mt-1"
        :class="[percent < 0 ? 'text-error' : 'text-dark-light']"
      >
        {{ dateFormatted }}
      </p>
    </div>
  </div>
</template>
