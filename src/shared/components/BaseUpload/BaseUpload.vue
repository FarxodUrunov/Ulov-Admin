<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseUploadImage from '@/shared/components/BaseUpload/components/BaseUploadImage.vue'
import { useDropZone } from '@vueuse/core'
import { useFilesCheck } from './composables/useFilesCheck'
import { useBaseUploadClasses } from './composables/useBaseUploadClasses'
import { useCachedUid } from '@/shared/composables/useCachedUid'
import { isObject } from '@/shared/utils'
import type { ComponentSize, ImageModel, fileTypes } from './types'

const props = withDefaults(
  defineProps<{
    modelValue: ImageModel | null
    accept: Array<keyof typeof fileTypes>
    description: string
    title?: string
    size?: ComponentSize
    limitSize?: number // in megabytes
    full?: boolean
    loading?: boolean
    message?: string
    success?: boolean
    error?: boolean
    dropzoneVariant?: string
    dropzoneTitle?: string
    carUpload?: boolean
    dataTest?: string
  }>(),
  {
    title: 'Загрузить фото',
    limitSize: 8,
    size: 'md',
    full: true,
    dataTest: 'file-input'
  }
)
const emit = defineEmits(['update:modelValue', 'files-upload', 'file-delete'])

const { t } = useI18n()

const uploadValue = computed({
  get: () => props.modelValue,
  set: (value: ImageModel | null) => {
    emit('update:modelValue', value)
  }
})

const { checkFiles } = useFilesCheck({ limitSize: props.limitSize, accept: props.accept })
const { focusState, setDropzoneSize, setColors, setBorderVariant } = useBaseUploadClasses()
const { id } = useCachedUid()

const dropzone = ref<HTMLDivElement>()
const fileInput = ref<HTMLInputElement>()

const fileInputOpen = () => {
  fileInput.value?.click()
}

const handleFile = (files: File[] | null) => {
  if (files && checkFiles(files)) {
    emit('files-upload', files)
    // TODO: upload file to server
    uploadValue.value = {
      id: files[0].size,
      name: files[0].name,
      size: files[0].size,
      path: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
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

const handleFileEdit = () => {
  // TODO: add notification
  fileInputOpen()
}

const handleFileDelete = () => {
  // TODO: add notification
  emit('file-delete', uploadValue.value?.id)
}

const { isOverDropZone } = useDropZone(dropzone, handleFile)
</script>

<template>
  <div>
    <div class="flex flex-wrap flex-row justify-start items-center gap-5">
      <div
        ref="dropzone"
        data-test="dropzone"
        class="inline-block relative"
        :class="[setDropzoneSize(size), dropzoneVariant]"
      >
        <BaseUploadImage
          data-test="upload-image"
          v-if="uploadValue && isObject(uploadValue) && Object.keys(uploadValue).length"
          :path="uploadValue.path"
          :size="size"
          @edit="handleFileEdit"
          @delete="handleFileDelete"
        />
        <button
          v-else
          data-test="title"
          type="button"
          class="w-full h-full flex flex-col justify-center items-center bg-light rounded-lg cursor-pointer transition-colors"
          :class="[
            setBorderVariant(isOverDropZone, { error }),
            setColors({ error }).dropzone,
            focusState
          ]"
          :title="dropzoneTitle || title"
          @click="fileInputOpen"
        >
          <BaseIcon
            :name="carUpload ? 'cameraOutline' : 'image'"
            :class="['mb-1', carUpload ? 'w-8 h-8' : 'w-14 h-14 ']"
          />
          <span v-if="!carUpload" class="flex items-center px-5">
            <BaseIcon name="upload" class="w-5 h-5 mr-1.5" />
            <span class="flex-1 font-semibold text-left line-clamp-1">
              {{ dropzoneTitle || t('buttons.upload') }}
            </span>
          </span>
          <span
            v-if="dropzoneTitle && description"
            class="text-sm text-dark-light mt-1.5 px-5 line-clamp-2"
          >
            {{ description }}
          </span>
        </button>
        <input
          :id="id"
          ref="fileInput"
          :data-test="dataTest"
          type="file"
          class="hidden"
          :accept="accept.map((type) => `.${type}`).join(',')"
          @change="handleChange"
        />
      </div>
      <div
        v-if="full"
        data-test="label-trigger"
        class="flex flex-col justify-start items-start"
        :class="{ 'text-error': error }"
      >
        <label :for="id" data-test="description" class="inline-block mb-2">{{ description }}</label>
        <BaseButton
          :variant="error ? 'none' : 'secondary'"
          :class="setColors({ error }).button"
          :icon="{ name: 'galleryAddOutline', position: 'left' }"
          @click="fileInputOpen"
        >
          {{ title }}
        </BaseButton>
      </div>
    </div>
    <p v-if="message" data-test="message" class="text-sm mt-2" :class="setColors({ error }).text">
      {{ message }}
    </p>
  </div>
</template>
