<script setup lang="ts">
defineProps<{
  href: string
  total: number
}>()
</script>

<template>
  <a
    class="relative flex justify-center items-center w-10 h-10 text-xs font-medium text-white bg-gray-dark rounded-full border-2 border-white hover:bg-gray"
    :href="href"
  >
    +{{ total }}
  </a>
</template>
