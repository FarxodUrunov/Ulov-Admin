<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import SubscriptionActions from './SubscriptionActions.vue'

const props = withDefaults(
  defineProps<{
    tariffName: string
    price: number | string
    featureName: string[]
    variant?: 'light' | 'dark'
    time?: string
  }>(),
  {
    variant: 'light'
  }
)
const emit = defineEmits(['action'])

const action = {
  edit: true,
  delete: true,
  duplicate: true
}

const cardBgColor = computed(() => {
  if (props.variant === 'light') return 'bg-white'
  return 'bg-blue-600'
})

const tariffColor = computed(() => {
  if (props.variant === 'light') return 'border-primary text-primary bg-blue-100'
  return 'border-light text-light bg-blue-500'
})

const checkColor = computed(() => {
  if (props.variant === 'light') return 'bg-blue-600 text-white'
  return 'bg-white text-blue-600'
})

const textColor = computed(() => {
  if (props.variant === 'light') return 'text-dark-light'
  return 'text-light'
})

const priceColor = computed(() => {
  if (props.variant === 'light') return 'text-black'
  return 'text-white'
})

const actionColor = computed(() => {
  if (props.variant === 'light') return 'text-dark-light'
  return 'text-white'
})

const handleAction = (action: 'edit' | 'duplicate' | 'delete') => {
  emit('action', action)
}
</script>

<template>
  <div :class="cardBgColor" class="rounded-xl p-4 shadow-lg">
    <div class="flex justify-between items-center">
      <div :class="tariffColor" class="border rounded-lg py-2 px-4">
        {{ tariffName }}
      </div>
      <SubscriptionActions :action="action" :color="actionColor" @action="handleAction" />
    </div>
    <div class="my-6">
      <b :class="priceColor" class="text-2xl font-bold">{{ price }}</b>
      <span v-if="time" :class="textColor" class="text-sm font-medium"> / {{ time }}</span>
    </div>
    <ul>
      <li v-for="(item, i) in featureName" :key="i + item" class="flex items-center gap-2 my-5">
        <span :class="checkColor" class="rounded-full w-5 h-5 p-1">
          <BaseIcon name="checkOutline" viewBox="0 -2 28 28" />
        </span>
        <p :class="textColor" class="text-sm font-medium">{{ item }}</p>
      </li>
    </ul>
  </div>
</template>
