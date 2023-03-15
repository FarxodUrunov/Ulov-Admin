<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import VehicleTabForm from './VehicleTabForm.vue'
import AdditionalInfoTabForm from './AdditionalInfoTabForm.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()
const tabs = ['vehicle', 'additionalInformation']

const showModal = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value)
})
</script>

<template>
  <BaseModal v-model="showModal" :header-text="t('addVehicle')" size="lg" hide-footer>
    <template #body>
      <BaseTab :tabs="tabs.map((tab) => t(tab))" tab-panel-variant="pt-4">
        <template #tab-0>
          <VehicleTabForm />
        </template>
        <template #tab-1>
          <AdditionalInfoTabForm />
        </template>
      </BaseTab>
    </template>
  </BaseModal>
</template>
