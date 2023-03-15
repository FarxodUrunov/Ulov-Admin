<script setup lang="ts">
import { computed } from 'vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import type { ImageModel } from '@/shared/components/BaseUpload/types'

const props = withDefaults(
  defineProps<{
    modelValue?: ImageModel[]
    title?: string
    limitNumber?: number
    message?: string
    success?: boolean
    error?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: () => [],
    limitNumber: 4
  }
)
const emit = defineEmits(['update:modelValue'])

const files = computed({
  get() {
    return props.modelValue
  },
  set(files) {
    emit('update:modelValue', files)
  }
})

const borderVariant = computed(() => {
  if (props.error) return 'border-error'
  if (props.success) return 'border-success'
  if (!props.error && !props.success) return 'border-gray-light'
  return ''
})
</script>

<template>
  <div class="w-full">
    <div
      class="flex flex-col gap-2 border p-3 rounded-lg"
      :class="borderVariant"
      data-test="border"
    >
      <p class="text-xs text-gray-dark">{{ title }}</p>
      <div class="flex flex-wrap gap-1.5">
        <div
          v-for="(n, index) in limitNumber"
          :key="n"
          class="relative w-20 h-20 rounded-lg border border-gray-light"
          data-test="list"
        >
          <BaseUpload
            v-model="files[index]"
            size="none"
            :accept="['png', 'jpg', 'jpeg', 'webp']"
            description="Загрузите аватар"
            :full="false"
            dropzone-variant="w-20 h-20"
            car-upload
            :error="error"
            :success="success"
          />
        </div>
      </div>
    </div>
    <p v-if="error" class="text-error text-xs mt-2 font-normal ml-4">{{ message }}</p>
  </div>
</template>
