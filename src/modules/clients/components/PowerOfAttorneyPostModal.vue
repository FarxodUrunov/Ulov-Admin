<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { usePowerOfAttorneyForm } from '@/modules/clients/composables/vehicles/usePowerOfAttorneyForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const {
  // data
  powerOfAttorneyTypes,
  // form
  powerOfAttorneyType,
  startDate,
  endDate,
  licenseSeries,
  licenseNumber,
  issuedTo,
  passportSeries,
  passportNumber,
  handleFormSubmit
} = usePowerOfAttorneyForm()

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('addPowerOfAttorney')" size="xs" hide-footer>
    <template #body>
      <form @submit.prevent="handleFormSubmit">
        <BaseSingleSelect
          id="powerOfAttorneyType"
          v-model="powerOfAttorneyType.value.value"
          name="powerOfAttorneyType"
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('form.powerOfAttorneyType')"
          :options="powerOfAttorneyTypes"
          :success="powerOfAttorneyType.meta.valid && powerOfAttorneyType.meta.dirty"
          :error="!powerOfAttorneyType.meta.valid && !!powerOfAttorneyType.errorMessage.value"
          :message="
            powerOfAttorneyType.errorMessage.value && t(powerOfAttorneyType.errorMessage.value)
          "
        />
        <h4 class="text-sm font-medium mt-4 mb-2">{{ t('validityPeriod') }}</h4>
        <div class="grid md:grid-cols-2 gap-2.5">
          <BaseDatepicker
            id="startDate"
            v-model="startDate.value.value"
            name="startDate"
            :label="t('form.timeFrom')"
            :success="startDate.meta.valid && startDate.meta.dirty"
            :error="!startDate.meta.valid && !!startDate.errorMessage.value"
            :message="startDate.errorMessage.value && t(startDate.errorMessage.value)"
            auto-apply
          />
          <BaseDatepicker
            id="endDate"
            v-model="endDate.value.value"
            name="endDate"
            :label="t('form.timeTo')"
            :success="endDate.meta.valid && endDate.meta.dirty"
            :error="!endDate.meta.valid && !!endDate.errorMessage.value"
            :message="endDate.errorMessage.value && t(endDate.errorMessage.value)"
            auto-apply
          />
        </div>
        <h4 class="text-sm font-medium mt-4 mb-2">{{ t('licenseSeriesAndNumber') }}</h4>
        <div class="grid grid-cols-12 gap-2.5">
          <BaseInput
            id="licenseSeries"
            v-model="licenseSeries.value.value"
            name="licenseSeries"
            :label="t('form.series')"
            :success="licenseSeries.meta.valid && licenseSeries.meta.dirty"
            :error="!licenseSeries.meta.valid && !!licenseSeries.errorMessage.value"
            :message="licenseSeries.errorMessage.value && t(licenseSeries.errorMessage.value)"
            wrapper-variant="col-span-12 sm:col-span-4"
            data-test="license-series"
          />
          <BaseInput
            id="licenseNumber"
            v-model="licenseNumber.value.value"
            name="licenseNumber"
            :label="t('form.number')"
            :success="licenseNumber.meta.valid && licenseNumber.meta.dirty"
            :error="!licenseNumber.meta.valid && !!licenseNumber.errorMessage.value"
            :message="licenseNumber.errorMessage.value && t(licenseNumber.errorMessage.value)"
            wrapper-variant="col-span-12 sm:col-span-8"
            data-test="license-number"
          />
          <BaseInput
            id="issuedTo"
            v-model="issuedTo.value.value"
            name="issuedTo"
            :label="t('form.issuedTo')"
            :success="issuedTo.meta.valid && issuedTo.meta.dirty"
            :error="!issuedTo.meta.valid && !!issuedTo.errorMessage.value"
            :message="issuedTo.errorMessage.value && t(issuedTo.errorMessage.value)"
            wrapper-variant="col-span-12"
            data-test="issued-to"
          />
        </div>
        <h4 class="text-sm font-medium mt-4 mb-2">{{ t('passportSeriesAndNumber') }}</h4>
        <div class="grid grid-cols-12 gap-2.5">
          <BaseInput
            id="passportSeries"
            v-model="passportSeries.value.value"
            name="passportSeries"
            :label="t('form.series')"
            :success="passportSeries.meta.valid && passportSeries.meta.dirty"
            :error="!passportSeries.meta.valid && !!passportSeries.errorMessage.value"
            :message="passportSeries.errorMessage.value && t(passportSeries.errorMessage.value)"
            wrapper-variant="col-span-12 sm:col-span-4"
            data-test="passport-series"
          />
          <BaseInput
            id="passportNumber"
            v-model="passportNumber.value.value"
            name="passportNumber"
            :label="t('form.number')"
            :success="passportNumber.meta.valid && passportNumber.meta.dirty"
            :error="!passportNumber.meta.valid && !!passportNumber.errorMessage.value"
            :message="passportNumber.errorMessage.value && t(passportNumber.errorMessage.value)"
            wrapper-variant="col-span-12 sm:col-span-8"
            data-test="passport-number"
          />
        </div>
        <PostFormActions
          class="mt-6"
          :cancel-text="t('buttons.cancel')"
          :confirm-text="t('buttons.save')"
          full-width
        />
      </form>
    </template>
  </BaseModal>
</template>
