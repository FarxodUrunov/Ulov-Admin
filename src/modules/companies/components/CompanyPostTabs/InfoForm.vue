<script setup lang="ts">
import BaseTextarea from '@/shared/components/BaseTextarea/BaseTextarea.vue'
import BaseUploadDragger from '@/shared/components/BaseUploadDragger/BaseUploadDragger.vue'
import PostFormActions from '../PostFormActions.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import { useInfoForm } from '@/modules/companies/composables/useInfoForm'

const emit = defineEmits(['cancel', 'submit'])

const { t } = useTranslations()
const {
  companyRequired,
  btnInfoType,
  loading,
  description,
  photos,
  companyOne,
  isEdit,
  handleFormSubmit
} = useInfoForm()
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="handleFormSubmit">
    <BaseTextarea
      v-model="description.value.value"
      name="comment"
      :placeholder="t('aboutCompany')"
      :success="description?.meta?.valid && description?.meta?.dirty"
      :error="!description?.meta?.valid && !!description?.errorMessage?.value"
      :message="description?.errorMessage?.value && t(description?.errorMessage?.value)"
    />
    <p class="text-xl text-dark-light font-semibold">{{ t('photos') }}</p>
    <BaseUploadDragger
      v-model="photos.value.value"
      :accept="['png', 'jpeg', 'jpg']"
      :limitCount="8"
      :description="t('uploadCompanyPhotos')"
      :success="photos?.meta?.valid && photos?.meta?.dirty"
      :error="!photos?.meta?.valid && !!photos?.errorMessage?.value"
      :message="photos?.errorMessage?.value && t(photos?.errorMessage?.value)"
    />
    <PostFormActions
      v-model="btnInfoType"
      v-model:company="companyRequired"
      v-model:edit="isEdit"
      :cancel-text="t('buttons.cancel')"
      :confirm-text="t('buttons.save')"
      :add-text="Object.keys(companyOne).length ? t('buttons.change') : t('buttons.add')"
      :isLoading="loading"
      @click-cancel="emit('cancel')"
      @submit="emit('submit')"
    />
  </form>
</template>
