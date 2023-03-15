<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import { useDropZone } from '@vueuse/core'
import { useFilesCheck } from '@/shared/components/BaseUpload/composables/useFilesCheck'
import { useBaseUploadDraggerClasses } from './composables/useBaseUploadDraggerClasses'
import type { ImageModel, fileTypes } from '@/shared/components/BaseUpload/types'

const props = withDefaults(
  defineProps<{
    modelValue: Array<ImageModel | null> | null
    accept: Array<keyof typeof fileTypes>
    description: string
    limitCount?: number
    limitSize?: number // in megabytes
    loading?: boolean
    message?: string
    success?: boolean
    error?: boolean
  }>(),
  {
    limitCount: 8,
    limitSize: 10
  }
)
const emit = defineEmits(['update:modelValue', 'files-upload'])

const { t } = useI18n()

const uploadValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})

const { checkFiles } = useFilesCheck({
  limitSize: props.limitSize,
  accept: props.accept,
  limitCount: props.limitCount
})
const { focusState, setColors, setBorderVariant } = useBaseUploadDraggerClasses()

const uploadDragger = ref<HTMLDivElement>()
const fileInput = ref<HTMLInputElement>()

const fileInputOpen = () => {
  fileInput.value?.click()
}

const handleFile = (files: File[] | null) => {
  if (files && checkFiles(files)) {
    emit('files-upload', files)
    // TODO: upload files to server
    const filledFiles: Array<File | null> = [
      ...files,
      ...Array(props.limitCount - files.length).fill(null)
    ]
    uploadValue.value = filledFiles.map((file, index) => {
      if (!file) return file
      return {
        id: index + 1,
        name: file.name,
        size: file.size,
        path: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    })
  }
  if (fileInput.value) {
    fileInput.value.value = ''
    if (!/safari/i.test(navigator.userAgent)) {
      fileInput.value.type = ''
      fileInput.value.type = 'file'
    }
  }
}

const handleChange = (event: Event) => {
  const currentInput = event.target as HTMLInputElement
  const files = Array.from(currentInput.files || [])
  if (files.length) {
    handleFile(Array.from(files))
  }
}

const handleFileDelete = (fileId: number) => {
  if (Array.isArray(uploadValue.value)) {
    // TODO: delete file from server
    console.log(fileId)
  }
}

const { isOverDropZone } = useDropZone(uploadDragger, handleFile)

onMounted(() => {
  if (
    Array.isArray(uploadValue.value) &&
    uploadValue.value.length &&
    uploadValue.value.length < props.limitCount
  ) {
    uploadValue.value = [
      ...uploadValue.value,
      ...Array(props.limitCount - uploadValue.value.length).fill(null)
    ]
  }
})
</script>

<template>
  <div v-if="uploadValue && uploadValue.length" class="flex flex-wrap gap-4">
    <BaseUpload
      v-for="index in uploadValue.length"
      :data-test="`photo-${index}`"
      :key="index"
      v-model="uploadValue[index - 1]"
      size="sm"
      :description="description"
      :accept="accept"
      :full="false"
      @file-delete="handleFileDelete"
    />
  </div>
  <div v-else ref="uploadDragger" class="inline-block">
    <button
      type="button"
      :title="description"
      class="flex justify-center items-center bg-light p-8 rounded-xl shadow-dragdrop"
      :class="[
        setBorderVariant(isOverDropZone, { success, error }),
        setColors({ success, error }).dropzone,
        focusState
      ]"
      @click="fileInputOpen"
    >
      <BaseIcon name="cloudAddOutline" class="w-20 h-20" />
      <span class="flex-1 flex flex-col justify-start items-start text-left ml-4">
        <span class="font-medium text-lg text-dark">
          {{ t('buttons.dragAndDropFiles') }} or
          <span :class="setColors({ success, error }).text">{{ t('buttons.browse') }}</span>
        </span>
        <span data-test="description" class="text-gray-dark">{{ description }}</span>
      </span>
    </button>
    <input
      ref="fileInput"
      data-test="fileInput-multiple"
      type="file"
      class="hidden"
      multiple
      :accept="accept.map((type) => `.${type}`).join(',')"
      @change="handleChange"
    />
    <p
      v-if="message"
      data-test="message"
      class="text-sm mt-2"
      :class="setColors({ success, error }).text"
    >
      {{ message }}
    </p>
  </div>
</template>
