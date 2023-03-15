<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import BaseTextEditor from '@/shared/components/BaseTextEditor/BaseTextEditor.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import { useTranslations } from '../composables/useTranslations'
import { useAdvertisementForm } from '../composables/useAdvertisementForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()

const {
  topic,
  description,
  addressIds,
  carModels,
  serviceIds,
  startDate,
  endDate,
  companyId,
  url,
  photo,
  video,
  addressList,
  carModelList,
  serviceList,
  handleFormReset,
  handleFormSubmit,
  handleSaveDraft
} = useAdvertisementForm()

const showModal = computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show', value)
    if (!value) handleFormReset()
  }
})
</script>

<template>
  <BaseModal
    v-model="showModal"
    :headerText="t('editData')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.save')"
    @cancel="showModal = false"
  >
    <template #body>
      <form
        data-test="ads-form"
        class="grid grid-cols-2 gap-4 mt-4"
        @submit.prevent="handleFormSubmit"
      >
        <div class="col-span-2 lg:col-span-1">
          <BaseInput
            id="topic"
            v-model="topic.value.value"
            name="topic"
            :label="t('topic')"
            :success="topic.meta.valid && topic.meta.dirty"
            :error="!topic.meta.valid && !!topic.errorMessage.value"
            :message="topic.errorMessage.value && t(topic.errorMessage.value)"
          />
          <h3 class="text-dark text-base font-medium mt-4 mb-2">{{ t('whom') }}</h3>
          <div class="grid gap-4 mb-4">
            <BaseMultiSelect
              id="locations"
              v-model="addressIds.value.value"
              name="locations"
              :label="t('location')"
              :fieldNames="{ key: 'id', label: 'name' }"
              :options="addressList"
              :success="addressIds.meta.valid && addressIds.meta.dirty"
              :error="!addressIds.meta.valid && !!addressIds.errorMessage.value"
              :message="addressIds.errorMessage.value && t(addressIds.errorMessage.value)"
            />
            <BaseMultiSelect
              id="carModel"
              v-model="carModels.value.value"
              name="carModel"
              :label="t('carModel')"
              :fieldNames="{ key: 'id', label: 'name' }"
              :options="carModelList"
              :success="carModels.meta.valid && carModels.meta.dirty"
              :error="!carModels.meta.valid && !!carModels.errorMessage.value"
              :message="carModels.errorMessage.value && t(carModels.errorMessage.value)"
            />
            <BaseMultiSelect
              id="serviceNames"
              v-model="serviceIds.value.value"
              name="serviceNames"
              :label="t('serviceName')"
              :fieldNames="{ key: 'id', label: 'name' }"
              :options="serviceList"
              :success="serviceIds.meta.valid && serviceIds.meta.dirty"
              :error="!serviceIds.meta.valid && !!serviceIds.errorMessage.value"
              :message="serviceIds.errorMessage.value && t(serviceIds.errorMessage.value)"
            />
            <BaseSingleSelect
              id="companyId"
              v-model="companyId.value.value"
              name="companyId"
              :label="t('from')"
              :fieldNames="{ key: 'id', label: 'name' }"
              :options="serviceList"
              :success="companyId.meta.valid && companyId.meta.dirty"
              :error="!companyId.meta.valid && !!companyId.errorMessage.value"
              :message="companyId.errorMessage.value && t(companyId.errorMessage.value)"
            />
          </div>
          <h3 class="text-dark text-sm font-medium mb-2">{{ t('adDuration') }}</h3>
          <div class="grid sm:grid-cols-2 gap-4 mb-4">
            <BaseDatepicker
              id="startDate"
              v-model="startDate.value.value"
              name="startDate"
              :label="t('from')"
              auto-apply
              :success="startDate.meta.valid && startDate.meta.dirty"
              :error="!startDate.meta.valid && !!startDate.errorMessage.value"
              :message="startDate.errorMessage.value && t(startDate.errorMessage.value)"
            />
            <BaseDatepicker
              id="endDate"
              v-model="endDate.value.value"
              name="endDate"
              :label="t('to')"
              auto-apply
              :success="endDate.meta.valid && endDate.meta.dirty"
              :error="!endDate.meta.valid && !!endDate.errorMessage.value"
              :message="endDate.errorMessage.value && t(endDate.errorMessage.value)"
            />
          </div>
          <BaseInput
            id="url"
            v-model="url.value.value"
            name="url"
            :label="t('url')"
            :success="url.meta.valid && url.meta.dirty"
            :error="!url.meta.valid && !!url.errorMessage.value"
            :message="url.errorMessage.value && t(url.errorMessage.value)"
          />
        </div>
        <div class="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <BaseUpload
            v-model="photo.value.value"
            :accept="['png', 'jpg', 'jpeg', 'webp']"
            :dropzone-title="t('uploadCover')"
            :description="t('uploadCoverHint')"
            size="none"
            dropzone-variant="w-full min-w-[20rem] h-44"
            :full="false"
            :success="photo.meta.valid && photo.meta.dirty"
            :error="!photo.meta.valid && !!photo.errorMessage.value"
            :message="photo.errorMessage.value && t(photo.errorMessage.value)"
          />
          <BaseUpload
            v-model="video.value.value"
            :accept="['mp4']"
            :dropzone-title="t('uploadVideo')"
            :description="t('uploadVideoHint')"
            size="none"
            dropzone-variant="w-full min-w-[20rem] h-44"
            :full="false"
            :success="video.meta.valid && video.meta.dirty"
            :error="!video.meta.valid && !!video.errorMessage.value"
            :message="video.errorMessage.value && t(video.errorMessage.value)"
            data-test="video-upload"
          />
          <BaseTextEditor
            v-model="description.value.value"
            content-type="html"
            :success="description.meta.valid && description.meta.dirty"
            :error="!description.meta.valid && !!description.errorMessage.value"
            :message="description.errorMessage.value && t(description.errorMessage.value)"
          />
        </div>
      </form>
    </template>
    <template #footer>
      <div class="flex flex-wrap items-center justify-between flex-col sm:flex-row gap-4">
        <BaseButton size="sm" outlined @click="handleSaveDraft">{{ t('saveDraft') }}</BaseButton>
        <div class="flex items-center gap-4">
          <BaseButton variant="gray-light" size="sm" @click="showModal = false">
            {{ t('buttons.cancel') }}
          </BaseButton>
          <BaseButton @click="handleFormSubmit" size="sm" data-test="ad-submit">
            {{ t('publish') }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
