<script setup lang="ts">
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseUploadDragger from '@/shared/components/BaseUploadDragger/BaseUploadDragger.vue'
import PostFormActions from '@/modules/companies/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useAdditionalInfoTabForm } from '@/modules/clients/composables/vehicles/useAdditionalInfoTabForm'

const { t } = useTranslations()
const {
  // data
  vehicleColors,
  fuelTypes,
  transmissions,
  // form
  colorId,
  fuelTypeId,
  transmissionId,
  vin,
  photos,
  handleFormSubmit
} = useAdditionalInfoTabForm()
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <BaseSingleSelect
        id="color"
        v-model="colorId.value.value"
        name="color"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.vehicleColor')"
        :options="vehicleColors"
        :success="colorId.meta.valid && colorId.meta.dirty"
        :error="!colorId.meta.valid && !!colorId.errorMessage.value"
        :message="colorId.errorMessage.value && t(colorId.errorMessage.value)"
      />
      <BaseSingleSelect
        id="fuelType"
        v-model="fuelTypeId.value.value"
        name="fuelType"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.fuelType')"
        :options="fuelTypes"
        :success="fuelTypeId.meta.valid && fuelTypeId.meta.dirty"
        :error="!fuelTypeId.meta.valid && !!fuelTypeId.errorMessage.value"
        :message="fuelTypeId.errorMessage.value && t(fuelTypeId.errorMessage.value)"
      />
      <BaseSingleSelect
        id="transmission"
        v-model="transmissionId.value.value"
        name="transmission"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.transmission')"
        :options="transmissions"
        :success="transmissionId.meta.valid && transmissionId.meta.dirty"
        :error="!transmissionId.meta.valid && !!transmissionId.errorMessage.value"
        :message="transmissionId.errorMessage.value && t(transmissionId.errorMessage.value)"
      />
      <BaseInput
        id="vin"
        v-model="vin.value.value"
        name="vin"
        type="number"
        :label="t('form.vin')"
        :success="vin.meta.valid && vin.meta.dirty"
        :error="!vin.meta.valid && !!vin.errorMessage.value"
        :message="vin.errorMessage.value && t(vin.errorMessage.value)"
        data-test="release-year"
      />
    </div>
    <p class="text-xl text-dark-light font-semibold mb-2">{{ t('viPhotos') }}</p>
    <BaseUploadDragger
      v-model="photos.value.value"
      :accept="['png', 'jpeg', 'jpg']"
      :limit-count="8"
      :description="t('uploadViPhotos')"
      :success="photos.meta.valid && photos.meta.dirty"
      :error="!photos.meta.valid && !!photos.errorMessage.value"
      :message="photos.errorMessage.value && t(photos.errorMessage.value)"
    />
    <PostFormActions
      class="mt-6"
      :cancel-text="t('buttons.cancel')"
      :confirm-text="t('buttons.save')"
    />
  </form>
</template>
