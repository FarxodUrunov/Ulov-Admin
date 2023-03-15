<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref(1)
</script>

<template>
  <div role="listbox" class="overscroll-contain">
    <slot :activeIndex="activeIndex" />
  </div>
</template>
