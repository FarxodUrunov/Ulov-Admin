<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTranslations } from '../composables/useTranslations'
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
// assets
import error404 from '@/shared/assets/img/404.svg'
import error403 from '@/shared/assets/img/403.svg'
import error401 from '@/shared/assets/img/401.svg'
import error500 from '@/shared/assets/img/500.svg'

interface ErrorDetail {
  type: string
  title: string
  description: string
  photo: string
  subTitle?: string
}

const route = useRoute()
const { t } = useTranslations()
const errorName = route.name

const errorDetails = {
  error_401: {
    type: '401',
    title: '401.title',
    description: '401.description',
    photo: error401
  },
  error_403: {
    type: '403',
    title: '403.title',
    description: '403.description',
    photo: error403
  },
  error_404: {
    type: '404',
    title: '404.title',
    subTitle: '404.subTitle',
    description: '404.description',
    photo: error404
  },
  error_500: {
    type: '500',
    title: '500.title',
    description: '500.description',
    photo: error500
  }
}

let error = ref<ErrorDetail | false>(false)

onMounted(() => {
  switch (errorName) {
    case 'error_401':
      error.value = errorDetails.error_401
      return
    case 'error_403':
      error.value = errorDetails.error_403
      return
    case 'error_404':
      error.value = errorDetails.error_404
      return
    case 'error_500':
      error.value = errorDetails.error_500
      return
  }
})
</script>

<template>
  <div
    class="w-full min-h-screen flex justify-center items-center md:px-24 md:py-20 xl:px-40 xl:py-20"
  >
    <div
      v-if="error"
      class="w-full h-full bg-white flex flex-wrap flex-row justify-center items-center gap-8 rounded-lg py-4 px-10"
    >
      <img :src="error.photo" alt="Error" class="w-full max-w-md" />
      <div class="w-full max-w-md flex flex-col gap-4 text-center">
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold" data-test="error-type">
          {{ error.type }}
        </h1>
        <p class="text-base text-dark-light" data-test="error-title">{{ t(error.title) }}</p>
        <h3 v-if="error?.subTitle" class="text-xl text-dark font-bold">
          {{ t(error.subTitle) }}
        </h3>
        <p class="text-sm text-dark-light" data-test="error-desc">
          {{ t(error.description) }}
        </p>
        <div class="flex justify-center">
          <BaseLink to="/" data-test="navigate-home">{{ t('backHome') }}</BaseLink>
        </div>
      </div>
    </div>
  </div>
</template>
