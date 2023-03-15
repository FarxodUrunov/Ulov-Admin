<script setup lang="ts">
import { computed, ref } from 'vue'
import QuillEditor from './QuillEditor.vue'
import { useBaseTextEditor } from './useBaseTextEditor'

const props = withDefaults(
  defineProps<{
    modelValue: any
    message?: string
    contentType?: 'delta' | 'html' | 'text'
    error?: boolean
    success?: boolean
  }>(),
  { contentType: 'html' }
)
const emit = defineEmits(['update:modelValue'])

const { onChange } = useBaseTextEditor()

const content = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const isFocused = ref(false)

const statusVariant = computed(() => {
  if (props.error) return 'border-error ring-error/30'
  return `${isFocused.value ? 'border-primary/60' : 'border-gray-light'} ring-primary/30`
})
</script>

<template>
  <div>
    <div
      class="w-full mb-1 bg-white border rounded-xl"
      :class="[statusVariant, isFocused && 'ring-2']"
    >
      <QuillEditor
        v-model:content="content"
        :contentType="contentType"
        @ready="onChange"
        @blur="isFocused = false"
        @focus="isFocused = true"
      />
    </div>
    <p v-if="props.error" class="text-error text-xs mt-1 font-normal ml-4">
      {{ message }}
    </p>
  </div>
</template>
