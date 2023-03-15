<script setup lang="ts">
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import CarServiceTab from '../components/CarService/CarServiceTab.vue'
import TowTruckTab from '../components/TowTruck/TowTruckTab.vue'
import FuelTab from '../components/Fuel/FuelTab.vue'
import CarWashTab from '../components/CarWash/CarWashTab.vue'
import { useTranslations } from '../composables/useTranslations'

const { t } = useTranslations()

const tabs = ['carService', 'towTruck', 'fuel', 'carWash']
</script>

<template>
  <BaseTab :tabs="tabs.map((item) => t(item))">
    <template #tab-0>
      <CarServiceTab data-test="car-service" />
    </template>
    <template #tab-1>
      <TowTruckTab data-test="tow-truck" />
    </template>
    <template #tab-2>
      <FuelTab data-test="fuel" />
    </template>
    <template #tab-3>
      <CarWashTab data-test="car-wash" />
    </template>
  </BaseTab>
</template>
