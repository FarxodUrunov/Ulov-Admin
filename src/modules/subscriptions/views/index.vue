<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import SubscriptionCard from '@/modules/subscriptions/components/SubscriptionCard.vue'
import SubscriptionModal from '@/modules/subscriptions/components/SubscriptionModal.vue'
import { useTranslations } from '../composables/useTranslations'

const { t } = useTranslations()

const showModal = ref(false)
const subscriptions = [
  {
    id: 1,
    name: 'Months',
    price: 0,
    period_id: { id: 1, name: '' },
    advantages: [
      'Создание базы данных транспортных средств',
      'Создание базы данных транспортных средств',
      'Клиентский учет',
      'Статистические данные'
    ],
    created_at: '28.09.2022 09:23',
    updated_at: '10.11.2022 18:17'
  },
  {
    id: 2,
    name: '13 months',
    price: 250000,
    period_id: { id: 2, name: 'a month' },
    advantages: [
      'Создание базы данных транспортных средств',
      'Создание базы данных транспортных средств'
    ],
    created_at: '28.09.2022 09:23',
    updated_at: '10.11.2022 18:17'
  }
]

const handleAction = (event: string) => {
  console.log(event)
}
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <h2 class="font-bold text-dark-light text-xl">{{ t('menu.subscriptions') }}</h2>
    <BaseButton
      data-test="subscription-e2e"
      size="sm"
      :icon="{ name: 'plus', position: 'left', className: 'w-4 h-4' }"
      @click="showModal = true"
    >
      {{ t('buttons.add') }}
    </BaseButton>
  </div>
  <div class="flex flex-wrap items-stretch gap-8 justify-center">
    <SubscriptionCard
      v-for="item in subscriptions"
      :key="item.id"
      :tariff-name="item.name"
      :price="item.price === 0 ? t('free') : item.price"
      :feature-name="item.advantages"
      :time="item.period_id.name"
      :variant="item.price === 0 ? 'light' : 'dark'"
      @action="handleAction"
    />
  </div>
  <SubscriptionModal v-model:show="showModal" />
</template>
