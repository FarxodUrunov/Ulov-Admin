<script setup lang="ts">
import { onMounted, computed, nextTick, ref } from 'vue'

const props = defineProps<{
  modelValue: string | null
  placeholder: string
}>()
const emit = defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement>()
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus()
  })
})
</script>

<template>
  <input
    ref="inputRef"
    v-model="inputValue"
    class="w-full text-lg leading-8 p-3 outline-none bg-white text-dark rounded caret-secondary border border-secondary placeholder:text-dark-light"
    :placeholder="placeholder"
    autocomplete="off"
    spellcheck="false"
  />
</template>
