<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useInsuranceForm } from '@/modules/clients/composables/vehicles/useInsuranceForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const {
  // data
  companies,
  insuranceTypes,
  // form
  companyId,
  insuranceTypeId,
  licenseSeries,
  licenseNumber,
  startDate,
  endDate,
  driverCount,
  handleFormSubmit
} = useInsuranceForm()

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('addInsurance')" size="lg" hide-footer>
    <template #body>
      <form @submit.prevent="handleFormSubmit">
        <div class="grid md:grid-cols-2 gap-4">
          <BaseSingleSelect
            id="company"
            v-model="companyId.value.value"
            name="company"
            :field-names="{ key: 'id', label: 'name' }"
            :label="t('form.insuranceCompany')"
            :options="companies"
            :success="companyId.meta.valid && companyId.meta.dirty"
            :error="!companyId.meta.valid && !!companyId.errorMessage.value"
            :message="companyId.errorMessage.value && t(companyId.errorMessage.value)"
          />
          <BaseSingleSelect
            id="insuranceType"
            v-model="insuranceTypeId.value.value"
            name="insuranceType"
            :field-names="{ key: 'id', label: 'name' }"
            :label="t('form.insuranceType')"
            :options="insuranceTypes"
            :success="insuranceTypeId.meta.valid && insuranceTypeId.meta.dirty"
            :error="!insuranceTypeId.meta.valid && !!insuranceTypeId.errorMessage.value"
            :message="insuranceTypeId.errorMessage.value && t(insuranceTypeId.errorMessage.value)"
          />
        </div>
        <div class="grid lg:grid-cols-2 gap-4 my-5">
          <div>
            <h4 class="text-sm font-medium mb-2">{{ t('techPassportSeriesAndNumber') }}</h4>
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
            </div>
          </div>
          <div>
            <h4 class="text-sm font-medium mb-2">{{ t('validityPeriod') }}</h4>
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
          </div>
        </div>
        <div class="grid lg:grid-cols-2 gap-4 my-5">
          <BaseInput
            id="driverCount"
            v-model="driverCount.value.value"
            name="driverCount"
            type="number"
            :label="t('form.driverCount')"
            :success="driverCount.meta.valid && driverCount.meta.dirty"
            :error="!driverCount.meta.valid && !!driverCount.errorMessage.value"
            :message="driverCount.errorMessage.value && t(driverCount.errorMessage.value)"
            data-test="driver-count"
          />
        </div>
        <div class="grid lg:grid-cols-2 gap-4 my-5">
          <div class="flex flex-col justify-start items-start gap-1">
            <span class="block text-sm text-dark-light">{{ t('policyPrice') }}</span>
            <span class="block font-semibold">118 000 сум</span>
            <p class="text-sm text-dark-light">
              Страхование вреда, причиненного жизни и здоровью пострадавшей стороны
            </p>
            <span class="block font-semibold text-success">65%</span>
          </div>
          <div class="flex flex-col justify-start items-start gap-1">
            <span class="block text-sm text-dark-light">{{ t('insuredAmount') }}</span>
            <span class="block font-semibold">40 000 000 сум</span>
            <p class="text-sm text-dark-light">Возмещение ущерба имуществу потерпевшего</p>
            <span class="block font-semibold text-success">35%</span>
          </div>
        </div>
        <PostFormActions
          class="mt-6"
          :cancel-text="t('buttons.cancel')"
          :confirm-text="t('buttons.save')"
        />
      </form>
    </template>
  </BaseModal>
</template>
