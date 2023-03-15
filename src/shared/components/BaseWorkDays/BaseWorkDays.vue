<script setup lang="ts">
import { computed } from 'vue'
import BaseWorkDaysCheckbox from './components/BaseWorkDaysCheckbox.vue'
import type { WorkDays } from './types'

const props = defineProps<{
  modelValue: WorkDays
}>()
const emit = defineEmits(['update:modelValue'])

const workdays = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const weekDaysTitles = [
  'days.mon',
  'days.tue',
  'days.wed',
  'days.thu',
  'days.fri',
  'days.sat',
  'days.sun'
]
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <BaseWorkDaysCheckbox
      v-for="(_, index) in workdays"
      :key="index"
      v-model="workdays[index]"
      :title="weekDaysTitles[index]"
      :data-test="`workdays-${index}`"
    />
  </div>
</template>
