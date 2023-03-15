<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useGasForm } from '@/modules/clients/composables/vehicles/useGasForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const {
  // data
  gasTypes,
  // form
  gasTypeId,
  validityStartDate,
  validityEndDate,
  checkStartDate,
  checkEndDate,
  handleFormSubmit
} = useGasForm()

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('addGas')" size="xs" hide-footer>
    <template #body>
      <form @submit.prevent="handleFormSubmit">
        <BaseSingleSelect
          id="gasType"
          v-model="gasTypeId.value.value"
          name="gasType"
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('form.gasType')"
          :options="gasTypes"
          :success="gasTypeId.meta.valid && gasTypeId.meta.dirty"
          :error="!gasTypeId.meta.valid && !!gasTypeId.errorMessage.value"
          :message="gasTypeId.errorMessage.value && t(gasTypeId.errorMessage.value)"
        />
        <h4 class="text-sm font-medium mt-4 mb-2">{{ t('validityPeriod') }}</h4>
        <div class="grid md:grid-cols-2 gap-2.5">
          <BaseDatepicker
            id="validityStartDate"
            v-model="validityStartDate.value.value"
            name="validityStartDate"
            :label="t('form.timeFrom')"
            :success="validityStartDate.meta.valid && validityStartDate.meta.dirty"
            :error="!validityStartDate.meta.valid && !!validityStartDate.errorMessage.value"
            :message="
              validityStartDate.errorMessage.value && t(validityStartDate.errorMessage.value)
            "
            auto-apply
          />
          <BaseDatepicker
            id="validityEndDate"
            v-model="validityEndDate.value.value"
            name="validityEndDate"
            :label="t('form.timeTo')"
            :success="validityEndDate.meta.valid && validityEndDate.meta.dirty"
            :error="!validityEndDate.meta.valid && !!validityEndDate.errorMessage.value"
            :message="validityEndDate.errorMessage.value && t(validityEndDate.errorMessage.value)"
            auto-apply
          />
        </div>
        <h4 class="text-sm font-medium mt-4 mb-2">{{ t('gasCheckDate') }}</h4>
        <div class="grid md:grid-cols-2 gap-2.5">
          <BaseDatepicker
            id="checkStartDate"
            v-model="checkStartDate.value.value"
            name="checkStartDate"
            :label="t('form.timeFrom')"
            :success="checkStartDate.meta.valid && checkStartDate.meta.dirty"
            :error="!checkStartDate.meta.valid && !!checkStartDate.errorMessage.value"
            :message="checkStartDate.errorMessage.value && t(checkStartDate.errorMessage.value)"
            auto-apply
          />
          <BaseDatepicker
            id="checkEndDate"
            v-model="checkEndDate.value.value"
            name="checkEndDate"
            :label="t('form.timeTo')"
            :success="checkEndDate.meta.valid && checkEndDate.meta.dirty"
            :error="!checkEndDate.meta.valid && !!checkEndDate.errorMessage.value"
            :message="checkEndDate.errorMessage.value && t(checkEndDate.errorMessage.value)"
            auto-apply
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
