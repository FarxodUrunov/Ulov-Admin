<script setup lang="ts">
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import BrandAndModel from '@/modules/clients/components/Settings/BrandAndModel.vue'
import Color from '@/modules/clients/components/Settings/Color.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import type { TabProps } from '@/shared/components/BaseTab/types'

const { t } = useTranslations()

const tabs: TabProps[] = [
  {
    label: 'brandAndModel',
    to: { name: 'clients_settings', hash: '#brand-and-model' }
  },
  {
    label: 'color',
    to: { name: 'clients_settings', hash: '#color' }
  }
]
</script>

<template>
  <BaseTab :tabs="tabs.map((tab) => ({ ...tab, label: t(tab.label) }))" tab-panel-variant="pt-4">
    <template #tab-0>
      <BrandAndModel />
    </template>
    <template #tab-1>
      <Color />
    </template>
  </BaseTab>
</template>
