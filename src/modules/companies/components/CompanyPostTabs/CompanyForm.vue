<script setup lang="ts">
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseRadio from '@/shared/components/BaseRadio/BaseRadio.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import BaseTimepicker from '@/shared/components/BaseTimepicker/BaseTimepicker.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import BaseWorkDays from '@/shared/components/BaseWorkDays/BaseWorkDays.vue'
import BaseAddressInput from '@/shared/components/BaseAddressInput/BaseAddressInput.vue'
import PostFormActions from '../PostFormActions.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import { useCompanyForm } from '@/modules/companies/composables/useCompanyForm'

const emit = defineEmits(['cancel', 'submit'])

const { t } = useTranslations()
const {
  companyName,
  serviceTypes,
  paymentTypes,
  statusTypes,
  cover,
  name,
  companyType,
  type,
  nameSelect,
  phone,
  address,
  payment,
  workDays,
  startTime,
  endTime,
  status,
  companyRequired,
  btnCompanyType,
  loading,
  companyOne,
  isEdit,
  handleFormSubmit
} = useCompanyForm()

const companyTypes = ['head', 'branch']
</script>

<template>
  <form @submit.prevent="handleFormSubmit">
    <BaseUpload
      data-test="cover-upload"
      v-model="cover.value.value"
      :accept="['png', 'jpg', 'jpeg', 'webp']"
      :title="t('form.uploadImage')"
      :description="t('companyLogo')"
      :success="cover.meta.valid && cover.meta.dirty"
      :error="!cover.meta.valid && !!cover.errorMessage.value"
      :message="cover.errorMessage.value && t(cover.errorMessage.value)"
    />
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <BaseInput
        id="companyName"
        v-model="name.value.value"
        name="companyName"
        :label="t('form.companyName')"
        :success="name.meta.valid && name.meta.dirty"
        :error="!name.meta.valid && !!name.errorMessage.value"
        :message="name.errorMessage.value && t(name.errorMessage.value)"
        data-test="company-name"
      />
      <div class="flex flex-wrap lg:flex-nowrap gap-3">
        <BaseRadio
          v-for="item in companyTypes"
          :key="item"
          :value="item"
          :label="t(item)"
          :data-test="item"
          v-model="companyType.value.value"
          :error="!companyType.meta.valid && !!companyType.errorMessage.value"
        />
      </div>
      <div v-if="companyType.value.value == 'branch'" class="col-span-2 grid grid-cols-2 gap-6">
        <BaseSingleSelect
          id="companyNameSelect"
          v-model="nameSelect.value.value"
          name="companyNameSelect"
          search
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('form.mainCompanyName')"
          :options="companyName || undefined"
          :success="nameSelect.meta.valid && nameSelect.meta.dirty"
          :error="!nameSelect.meta.valid && !!nameSelect.errorMessage.value"
          :message="nameSelect.errorMessage.value && t(nameSelect.errorMessage.value)"
        />
      </div>
      <BaseSingleSelect
        id="serviceType"
        v-model="type.value.value"
        name="serviceType"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.serviceType')"
        :options="serviceTypes"
        :success="type.meta.valid && type.meta.dirty"
        :error="!type.meta.valid && !!type.errorMessage.value"
        :message="type.errorMessage.value && t(type.errorMessage.value)"
      />
      <BaseInput
        id="phone"
        v-model="phone.value.value"
        name="phone"
        :label="t('form.phone')"
        type="tel"
        :success="phone.meta.valid && phone.meta.dirty"
        :error="!phone.meta.valid && !!phone.errorMessage.value"
        :message="phone.errorMessage.value && t(phone.errorMessage.value)"
      />
      <BaseAddressInput
        id="address"
        v-model="address.value.value"
        name="address"
        :label="t('form.address')"
        :success="address.meta.valid && address.meta.dirty"
        :error="!address.meta.valid && !!address.errorMessage.value"
        :message="address.errorMessage.value && t(address.errorMessage.value)"
      />
      <BaseMultiSelect
        id="paymentType"
        v-model="payment.value.value"
        name="paymentType"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.paymentType')"
        :options="paymentTypes"
        :success="payment.meta.valid && payment.meta.dirty"
        :error="!payment.meta.valid && !!payment.errorMessage.value"
        :message="payment.errorMessage.value && t(payment.errorMessage.value)"
      />
      <BaseWorkDays v-model="workDays.value.value" />
      <div class="flex gap-3">
        <BaseTimepicker
          id="startTime"
          v-model="startTime.value.value"
          name="startTime"
          :label="t('form.timeFrom')"
          :success="startTime.meta.valid && startTime.meta.dirty"
          :error="!startTime.meta.valid && !!startTime.errorMessage.value"
          :message="startTime.errorMessage.value && t(startTime.errorMessage.value)"
        />
        <BaseTimepicker
          id="endTime"
          v-model="endTime.value.value"
          name="endTime"
          :label="t('form.timeTo')"
          :success="endTime.meta.valid && endTime.meta.dirty"
          :error="!endTime.meta.valid && !!endTime.errorMessage.value"
          :message="endTime.errorMessage.value && t(endTime.errorMessage.value)"
        />
      </div>
      <BaseSingleSelect
        id="status"
        v-model="status.value.value"
        name="status"
        :field-names="{ key: 'id', label: 'name' }"
        :label="t('form.status')"
        :options="statusTypes"
        :success="status.meta.valid && status.meta.dirty"
        :error="!status.meta.valid && !!status.errorMessage.value"
        :message="status.errorMessage.value && t(status.errorMessage.value)"
      />
    </div>
    <PostFormActions
      v-model="btnCompanyType"
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
