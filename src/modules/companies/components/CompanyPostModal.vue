<script setup lang="ts">
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import CompanyForm from './CompanyPostTabs/CompanyForm.vue'
import InfoForm from './CompanyPostTabs/InfoForm.vue'
import ServicesForm from './CompanyPostTabs/ServicesForm.vue'
import BrandsForm from './CompanyPostTabs/BrandsForm.vue'
import { useTranslations } from '../composables/useTranslations'
import { useCompanyPostModal } from '../composables/useCompanyPostModal'
import { watchEffect } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const tabs = ['aboutCompany', 'info', 'service', 'servicedBrands']

const { showModal, companyOne, handleFormSubmit, handleFormCancel } = useCompanyPostModal(
  props,
  emit
)

watchEffect(() => {
  if (!showModal.value) {
    companyOne.value = {}
  }
})
</script>

<template>
  <BaseModal
    v-model="showModal"
    :header-text="Object.keys(companyOne).length ? t('toChangeTheData') : t('addCompany')"
    size="lg"
    hide-footer
  >
    <template #body>
      <BaseTab :tabs="tabs.map((tab) => t(tab))" tab-panel-variant="pt-4">
        <template #tab-0>
          <CompanyForm @cancel="handleFormCancel" @submit="handleFormSubmit" />
        </template>
        <template #tab-1>
          <InfoForm @cancel="handleFormCancel" @submit="handleFormSubmit" />
        </template>
        <template #tab-2>
          <ServicesForm @cancel="handleFormCancel" @submit="handleFormSubmit" />
        </template>
        <template #tab-3>
          <BrandsForm @cancel="handleFormCancel" @submit="handleFormSubmit" />
        </template>
      </BaseTab>
    </template>
  </BaseModal>
</template>
