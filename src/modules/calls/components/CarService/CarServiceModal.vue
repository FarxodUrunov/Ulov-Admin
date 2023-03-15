<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseTextarea from '@/shared/components/BaseTextarea/BaseTextarea.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import BaseAddressInput from '@/shared/components/BaseAddressInput/BaseAddressInput.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import { useTranslations } from '@/modules/calls/composables/useTranslations'
import { useCarServiceForm } from '@/modules/calls/composables/useCarServiceModal'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const { t } = useTranslations()

const handleCancel = () => {
  showModal.value = false
  handleFormReset()
}

const {
  companyNameList,
  paymentMethodList,
  price,
  arrivalTime,
  telNumber,
  callTime,
  address,
  name,
  paymentMethod,
  comment,
  handleFormReset,
  handleFormSubmit
} = useCarServiceForm()
</script>

<template>
  <BaseModal
    v-model="showModal"
    :headerText="t('changeData')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.save')"
    @cancel="handleCancel"
    @confirm="handleFormSubmit"
  >
    <template #body>
      <form
        data-test="car-service-form"
        class="grid lg:grid-cols-2 items-start gap-6 mt-6"
        @submit.prevent="handleFormSubmit"
      >
        <BaseSingleSelect
          id="companyName"
          v-model="name.value.value"
          name="companyName"
          :label="t('form.companyName')"
          :options="companyNameList"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="name.meta.valid && name.meta.dirty"
          :error="!name.meta.valid && !!name.errorMessage.value"
          :message="name.errorMessage.value && t(name.errorMessage.value)"
        />
        <BaseInput
          id="telNumber"
          v-model="telNumber.value.value"
          name="telNumber"
          type="tel"
          :label="t('form.phone')"
          :success="telNumber.meta.valid && telNumber.meta.dirty"
          :error="!telNumber.meta.valid && !!telNumber.errorMessage.value"
          :message="telNumber.errorMessage.value && t(telNumber.errorMessage.value)"
        />
        <BaseInput
          id="price"
          v-model="price.value.value"
          name="price"
          type="number"
          :label="t('form.price')"
          :success="price.meta.valid && price.meta.dirty"
          :error="!price.meta.valid && !!price.errorMessage.value"
          :message="price.errorMessage.value && t(price.errorMessage.value)"
        >
          <template #suffix>
            <p class="text-dark-light">{{ t('units.uzs') }}</p>
          </template>
        </BaseInput>
        <BaseMultiSelect
          id="paymentMethod"
          v-model="paymentMethod.value.value"
          name="paymentMethod"
          :label="t('paymentMethod')"
          :options="paymentMethodList"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="paymentMethod.meta.valid && paymentMethod.meta.dirty"
          :error="!paymentMethod.meta.valid && !!paymentMethod.errorMessage.value"
          :message="paymentMethod.errorMessage.value && t(paymentMethod.errorMessage.value)"
        />
        <BaseDatepicker
          id="datepicker"
          v-model="callTime.value.value"
          name="datepicker"
          :label="t('callTime')"
          auto-apply
          :success="callTime.meta.valid && callTime.meta.dirty"
          :error="!callTime.meta.valid && !!callTime.errorMessage.value"
          :message="callTime.errorMessage.value && t(callTime.errorMessage.value)"
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
        <BaseInput
          id="arrivalTime"
          v-model="arrivalTime.value.value"
          name="arrivalTime"
          :label="t('arrivalTime')"
          :success="arrivalTime.meta.valid && arrivalTime.meta.dirty"
          :error="!arrivalTime.meta.valid && !!arrivalTime.errorMessage.value"
          :message="arrivalTime.errorMessage.value && t(arrivalTime.errorMessage.value)"
        />
        <BaseTextarea
          v-model="comment.value.value"
          name="comment"
          :placeholder="t('form.comment')"
          :success="comment.meta.valid && comment.meta.dirty"
          :error="!comment.meta.valid && !!comment.errorMessage.value"
          :message="comment.errorMessage.value && t(comment.errorMessage.value)"
        />
      </form>
    </template>
  </BaseModal>
</template>
