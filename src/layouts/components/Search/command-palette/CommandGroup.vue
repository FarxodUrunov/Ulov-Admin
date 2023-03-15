<script setup lang="ts">
defineProps<{
  heading: string
}>()
</script>

<template>
  <div role="presentation">
    <h3 v-if="heading" class="text-secondary text-sm leading-8 font-semibold px-1">
      {{ heading }}
    </h3>
    <div role="group">
      <slot />
    </div>
  </div>
</template>
