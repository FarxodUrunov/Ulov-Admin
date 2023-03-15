<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useTintingForm } from '@/modules/clients/composables/vehicles/useTintingForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const { startDate, endDate, handleFormSubmit } = useTintingForm()

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('addTinting')" size="xs" hide-footer>
    <template #body>
      <form @submit.prevent="handleFormSubmit">
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
