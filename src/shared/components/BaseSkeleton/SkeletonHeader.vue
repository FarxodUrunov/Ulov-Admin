<script setup lang="ts">
import Circle from '@/shared/components/BaseSkeleton/components/Circle.vue'
import Button from '@/shared/components/BaseSkeleton/components/Button.vue'
import Paragraph from '@/shared/components/BaseSkeleton/components/Paragraph.vue'

withDefaults(defineProps<{ active: boolean }>(), { active: false })
</script>

<template>
  <div
    v-if="active"
    data-test="header"
    class="animate-pulse bg-gradient-to-br from-gray-light to-gray-light h-16 border border-gray py-4 px-8 w-full flex items-center justify-end gap-x-6"
  >
    <Circle data-test="circle" />
    <Button data-test="button" />
    <div class="flex flex-col items-end">
      <Paragraph data-test="paragraph" class="h-3.5 w-36" />
      <Paragraph data-test="paragraph" class="h-3.5 w-28 mt-1.5" />
    </div>
    <Circle data-test="circle" size="lg" />
  </div>
  <slot v-else />
</template>
