<script setup lang="ts">
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useVehicleTabForm } from '@/modules/clients/composables/vehicles/useVehicleTabForm'

const { t } = useTranslations()
const {
  // data
  brands,
  models,
  clients,
  // form
  cover,
  brandId,
  modelId,
  releaseYear,
  govNumber,
  viSeries,
  viNumber,
  clientId,
  handleFormSubmit
} = useVehicleTabForm()
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <BaseUpload
      data-test="cover-upload"
      v-model="cover.value.value"
      :accept="['png', 'jpg', 'jpeg', 'webp']"
      :title="t('form.uploadImage')"
      :description="t('vehiclePhoto')"
      size="lg"
      :success="cover.meta.valid && cover.meta.dirty"
      :error="!cover.meta.valid && !!cover.errorMessage.value"
      :message="cover.errorMessage.value && t(cover.errorMessage.value)"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <BaseSingleSelect
        id="brand"
        v-model="brandId.value.value"
        name="brand"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.brand')"
        :options="brands"
        :success="brandId.meta.valid && brandId.meta.dirty"
        :error="!brandId.meta.valid && !!brandId.errorMessage.value"
        :message="brandId.errorMessage.value && t(brandId.errorMessage.value)"
      />
      <BaseSingleSelect
        id="model"
        v-model="modelId.value.value"
        name="model"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.model')"
        :options="models"
        :success="modelId.meta.valid && modelId.meta.dirty"
        :error="!modelId.meta.valid && !!modelId.errorMessage.value"
        :message="modelId.errorMessage.value && t(modelId.errorMessage.value)"
      />
      <BaseInput
        id="releaseYear"
        v-model="releaseYear.value.value"
        name="releaseYear"
        type="number"
        :label="t('form.releaseYear')"
        :success="releaseYear.meta.valid && releaseYear.meta.dirty"
        :error="!releaseYear.meta.valid && !!releaseYear.errorMessage.value"
        :message="releaseYear.errorMessage.value && t(releaseYear.errorMessage.value)"
        data-test="release-year"
      />
      <BaseInput
        id="govNumber"
        v-model="govNumber.value.value"
        name="govNumber"
        :label="t('form.govNumber')"
        :success="govNumber.meta.valid && govNumber.meta.dirty"
        :error="!govNumber.meta.valid && !!govNumber.errorMessage.value"
        :message="govNumber.errorMessage.value && t(govNumber.errorMessage.value)"
        data-test="gov-number"
      />
      <div class="grid grid-cols-12 gap-3">
        <BaseInput
          id="viSeries"
          v-model="viSeries.value.value"
          name="viSeries"
          :label="t('form.series')"
          :success="viSeries.meta.valid && viSeries.meta.dirty"
          :error="!viSeries.meta.valid && !!viSeries.errorMessage.value"
          :message="viSeries.errorMessage.value && t(viSeries.errorMessage.value)"
          wrapper-variant="col-span-4"
          data-test="vi-series"
        />
        <BaseInput
          id="viNumber"
          v-model="viNumber.value.value"
          name="viNumber"
          type="number"
          :label="t('form.viNumber')"
          :success="viNumber.meta.valid && viNumber.meta.dirty"
          :error="!viNumber.meta.valid && !!viNumber.errorMessage.value"
          :message="viNumber.errorMessage.value && t(viNumber.errorMessage.value)"
          wrapper-variant="col-span-8"
          data-test="vi-number"
        />
      </div>
      <BaseSingleSelect
        id="client"
        v-model="clientId.value.value"
        name="client"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('client')"
        :options="clients"
        :success="clientId.meta.valid && clientId.meta.dirty"
        :error="!clientId.meta.valid && !!clientId.errorMessage.value"
        :message="clientId.errorMessage.value && t(clientId.errorMessage.value)"
      />
    </div>
    <PostFormActions :cancel-text="t('buttons.cancel')" :confirm-text="t('buttons.save')" />
  </form>
</template>
