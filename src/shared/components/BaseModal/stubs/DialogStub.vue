<script setup lang="ts">
import { computed } from 'vue'

/** Note: focus trap functionality not implemented */
const props = withDefaults(
  defineProps<{
    open?: boolean
    initialFocus?: HTMLElement | null // Functionality not implemented
    as?: string
    static?: boolean
    unmount?: boolean
  }>(),
  {
    initialFocus: null,
    as: 'div',
    static: false,
    unmount: true
  }
)

const showState = computed(() => {
  if (props.static || props.unmount) return true
  return props.open
})
</script>

<template>
  <component :is="as" v-show="showState">
    <slot :open="open" />
  </component>
</template>
