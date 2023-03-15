<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat } from '@vueuse/core'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import type { Notification } from './types'

const props = defineProps<{
  item: Notification
  persistentClose?: boolean
}>()

const dateFormatted = computed(() => {
  const formatted = useDateFormat(props.item.date, 'DD.MM.YYYY HH:mm').value.split(' ')
  return {
    date: formatted[0],
    time: formatted[1]
  }
})
</script>

<template>
  <div class="relative group border-b border-dark-lighter last:border-transparent py-2.5 px-4">
    <span v-if="item.read" class="absolute top-4.5 w-2.5 h-2.5 bg-primary rounded-full"></span>
    <div class="ml-5 mr-9">
      <h1 class="mb-1 font-semibold text-lg">{{ item.title }}</h1>
      <p class="text-sm text-dark-light">
        {{ item.description }}
      </p>
      <div class="flex justify-between items-center text-sm font-medium text-dark-light mt-2">
        <span>{{ dateFormatted.date }}</span>
        <span>{{ dateFormatted.time }}</span>
      </div>
    </div>
    <div
      class="transition-opacity duration-200 absolute top-2.5 right-2.5"
      :class="{ 'opacity-0 group-hover:opacity-100': !persistentClose }"
    >
      <BaseButton
        variant="none"
        :icon="{ name: 'close', className: 'w-6 h-6 text-primary' }"
        size="sm"
        class="w-8 h-8 !p-0 !min-h-0 bg-gray-light hover:bg-gray"
        :has-default-slot="false"
      />
    </div>
  </div>
</template>
