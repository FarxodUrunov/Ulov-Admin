<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'

const props = defineProps<{
  modelValue: boolean | undefined
  title: string
}>()
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()

const checkboxInput = ref<HTMLInputElement | null>(null)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      data-test="checkboxInput"
      ref="checkboxInput"
      v-model="value"
      type="checkbox"
      class="hidden peer"
    />
    <BaseButton
      data-test="title"
      variant="none"
      size="none"
      class="w-11 h-11 text-sm font-medium capitalize bg-white border border-gray-dark rounded-md duration-200 peer peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary"
      @click="checkboxInput?.click()"
    >
      {{ t(title) }}
    </BaseButton>
  </label>
</template>
