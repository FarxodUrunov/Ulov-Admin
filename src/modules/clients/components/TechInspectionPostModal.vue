<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import PostFormActions from '@/modules/clients/components/PostFormActions.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { useTechInspectionForm } from '@/modules/clients/composables/vehicles/useTechInspectionForm'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const {
  // data
  departments,
  inspectionPlaces,
  // form
  techDepartmentId,
  techInspectionPlaceId,
  startDate,
  endDate,
  handleFormSubmit
} = useTechInspectionForm()

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('addTechInspection')" size="xs" hide-footer>
    <template #body>
      <form @submit.prevent="handleFormSubmit">
        <BaseSingleSelect
          id="techDepartment"
          v-model="techDepartmentId.value.value"
          name="techDepartment"
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('form.techDepartment')"
          :options="departments"
          :success="techDepartmentId.meta.valid && techDepartmentId.meta.dirty"
          :error="!techDepartmentId.meta.valid && !!techDepartmentId.errorMessage.value"
          :message="techDepartmentId.errorMessage.value && t(techDepartmentId.errorMessage.value)"
        />
        <BaseSingleSelect
          id="techInspectionPlace"
          v-model="techInspectionPlaceId.value.value"
          name="techInspectionPlace"
          :field-names="{ key: 'id', label: 'name' }"
          :label="t('form.techInspectionPlace')"
          :options="inspectionPlaces"
          :success="techInspectionPlaceId.meta.valid && techInspectionPlaceId.meta.dirty"
          :error="!techInspectionPlaceId.meta.valid && !!techInspectionPlaceId.errorMessage.value"
          :message="
            techInspectionPlaceId.errorMessage.value && t(techInspectionPlaceId.errorMessage.value)
          "
          class="mt-4"
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
