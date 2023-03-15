<script setup lang="ts">
import BaseBadge from '@/shared/components/BaseBadge/BaseBadge.vue'

withDefaults(
  defineProps<{
    items: (string | number)[]
    variant?: 'success' | 'secondary' | 'error'
  }>(),
  {
    variant: 'secondary'
  }
)
</script>

<template>
  <div class="flex gap-2 flex-wrap">
    <div data-test="items-title" v-for="(item, index) in items" :key="index">
      <BaseBadge :variant="variant" :text="item" />
    </div>
  </div>
</template>
