<script setup lang="ts">
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import CardServices from '@/modules/companies/components/ParrentPage/CardServices.vue'
import TowTruckTab from '@/modules/companies/components/ParrentPage/TowTruck.vue'
import FuelTab from '@/modules/companies/components/ParrentPage/Fuel.vue'
import CarWashTab from '@/modules/companies/components/ParrentPage/CarWash.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'

const { t } = useTranslations()

const tabs = ['carServices', 'towTrucks', 'fuels', 'carWash']
</script>

<template>
  <BaseTab :tabs="tabs.map((item) => t(item))">
    <template #tab-0>
      <CardServices />
    </template>
    <template #tab-1>
      <TowTruckTab />
    </template>
    <template #tab-2>
      <FuelTab />
    </template>
    <template #tab-3>
      <CarWashTab />
    </template>
  </BaseTab>
</template>
