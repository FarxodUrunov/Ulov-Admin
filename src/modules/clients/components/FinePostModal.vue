<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useFineForm } from '@/modules/clients/composables/vehicles/useFineForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const { cardNumber, cardDate, sum, handleFormSubmit } = useFineForm()

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('payFine')" size="xs" hide-footer>
    <template #body>
      <form @submit.prevent="handleFormSubmit">
        <BaseInput
          id="cardNumber"
          v-model="cardNumber.value.value"
          name="cardNumber"
          :label="t('form.cardNumber')"
          :success="cardNumber.meta.valid && cardNumber.meta.dirty"
          :error="!cardNumber.meta.valid && !!cardNumber.errorMessage.value"
          :message="cardNumber.errorMessage.value && t(cardNumber.errorMessage.value)"
          wrapper-variant="mb-4"
          data-test="card-number"
        />
        <BaseInput
          id="cardDate"
          v-model="cardDate.value.value"
          name="cardDate"
          :label="t('form.cardDate')"
          :success="cardDate.meta.valid && cardDate.meta.dirty"
          :error="!cardDate.meta.valid && !!cardDate.errorMessage.value"
          :message="cardDate.errorMessage.value && t(cardDate.errorMessage.value)"
          wrapper-variant="mb-4"
          data-test="card-date"
        />
        <BaseInput
          id="sum"
          v-model="sum.value.value"
          name="sum"
          :label="t('form.sum')"
          :success="sum.meta.valid && sum.meta.dirty"
          :error="!sum.meta.valid && !!sum.errorMessage.value"
          :message="sum.errorMessage.value && t(sum.errorMessage.value)"
          data-test="sum"
        >
          <template #suffix>
            <span class="text-dark-light leading-none">{{ t('units.uzs') }}</span>
          </template>
        </BaseInput>
        <PostFormActions class="mt-6" :confirm-text="t('buttons.buy')" full-width hide-cancel />
      </form>
    </template>
  </BaseModal>
</template>
