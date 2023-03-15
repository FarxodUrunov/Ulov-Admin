<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from '@/shared/components/BaseCard/BaseCard.vue'
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import BaseList from '@/shared/components/BaseList/BaseList.vue'
import BaseBadge from '@/shared/components/BaseBadge/BaseBadge.vue'
import BaseRating from '@/shared/components/BaseRating/BaseRating.vue'
import TheSectionInfo from '@/shared/components/TheSectionInfo/TheSectionInfo.vue'
import TheDeleteModal from '@/shared/components/TheDeleteModal/TheDeleteModal.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import type { TabProps } from '@/shared/components/BaseTab/types'

// tab components
import Statistics from '@/modules/companies/components/ShowTabs/Statistics.vue'
import Reviews from '@/modules/companies/components/ShowTabs/Reviews.vue'
import Service from '@/modules/companies/components/ShowTabs/Service.vue'
import Managers from '@/modules/companies/components/ShowTabs/Managers.vue'
import Employees from '@/modules/companies/components/ShowTabs/Employees.vue'
import AboutCompany from '@/modules/companies/components/ShowTabs/AboutCompany.vue'

const { t } = useTranslations()
const tabs: TabProps[] = [
  {
    label: 'menu.statistics',
    to: { name: 'companies_show', hash: '#additional-information' }
  },
  {
    label: 'menu.reviews',
    to: { name: 'companies_show', hash: '#reviews' }
  },
  {
    label: 'service',
    to: { name: 'companies_show', hash: '#services' }
  },
  {
    label: 'managers',
    to: { name: 'companies_show', hash: '#managers' }
  },
  {
    label: 'employees',
    to: { name: 'companies_show', hash: '#employees' }
  },
  {
    label: 'aboutCompany',
    to: { name: 'companies_show', hash: '#companies' }
  }
]

const showDeleteModal = ref(false)

const dataSource = [
  {
    id: 'phone',
    label: 'Номер телефона',
    value: '+998901234567'
  },
  {
    id: 'dob',
    label: 'Дата рождения',
    value: '19.02.2022'
  },
  {
    id: 'role',
    label: 'Роль пользователя',
    value: 'Супер Админ'
  },
  {
    id: 'created_at',
    label: 'Дата регистрация',
    value: '28.09.2022, 09:23'
  },
  {
    id: 'address',
    label: 'Адрес',
    value: 'Г Ташкент, Shosh Avenue'
  },
  {
    id: 'rating',
    label: 'Рейтинг',
    value: 4.5
  },
  {
    id: 'status',
    label: 'Статус',
    value: 'Актив'
  }
]

const handleDelete = () => {
  showDeleteModal.value = true
}
</script>

<template>
  <TheDeleteModal
    v-model="showDeleteModal"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.confirm')"
  />

  <TheSectionInfo
    :image="{
      src: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=804&h=500&dpr=1',
      alt: 'Service image',
      type: 'img',
      rounded: true
    }"
    :actions="{ edit: true, delete: true }"
    @delete="handleDelete"
  >
    <BaseList title="AUTO REPAIR" :data-source="dataSource">
      <template #address="{ value }">
        <a
          class="capitalize text-primary"
          href="https://yandex.com/maps/10335/tashkent/?ll=69.280041%2C41.309910&z=17.4"
          target="_blank"
        >
          {{ value }}
        </a>
      </template>
      <template #rating="{ value }">
        <div class="flex items-center gap-2">
          <BaseRating :model-value="Number(value)" disabled />
          <span>{{ value }}</span>
        </div>
      </template>
      <template #status="{ value }">
        <BaseBadge variant="success" :text="value" />
      </template>
    </BaseList>
  </TheSectionInfo>
  <BaseCard class="mt-4">
    <BaseTab :tabs="tabs.map((tab) => ({ ...tab, label: t(tab.label) }))" tab-panel-variant="pt-4">
      <template #tab-0>
        <Statistics />
      </template>
      <template #tab-1>
        <Reviews />
      </template>
      <template #tab-2>
        <Service />
      </template>
      <template #tab-3>
        <Managers />
      </template>
      <template #tab-4>
        <Employees />
      </template>
      <template #tab-5>
        <AboutCompany />
      </template>
    </BaseTab>
  </BaseCard>
</template>
