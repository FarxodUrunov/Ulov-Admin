<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    type?: 'img' | 'user'
  }>(),
  {
    src: '',
    alt: '',
    type: 'img'
  }
)

const isError = ref(false)

const imgUrl = computed(() => {
  if (props.src) return props.src
  return `/images/${props.type}NotFound.svg`
})

const onError = (event: Event) => {
  const element = event.target as HTMLImageElement
  element.src = `/images/${props.type}NotFound.svg`
  isError.value = true
}
</script>

<template>
  <img
    :src="imgUrl"
    :alt="alt"
    :class="{ '!max-w-[100px] !h-[unset] !object-contain !rounded-none': isError }"
    @error="onError"
  />
</template>
