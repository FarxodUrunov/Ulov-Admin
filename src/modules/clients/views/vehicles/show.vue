<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseCard from '@/shared/components/BaseCard/BaseCard.vue'
import BaseTab from '@/shared/components/BaseTab/BaseTab.vue'
import BaseList from '@/shared/components/BaseList/BaseList.vue'
import BaseBadge from '@/shared/components/BaseBadge/BaseBadge.vue'
import BaseRating from '@/shared/components/BaseRating/BaseRating.vue'
import BaseNoteCard from '@/shared/components/BaseNoteCard/BaseNoteCard.vue'
import TheSectionInfo from '@/shared/components/TheSectionInfo/TheSectionInfo.vue'
import TheDeleteModal from '@/shared/components/TheDeleteModal/TheDeleteModal.vue'
import PowerOfAttorneyPostModal from '@/modules/clients/components/PowerOfAttorneyPostModal.vue'
import TechInspectionPostModal from '@/modules/clients/components/TechInspectionPostModal.vue'
import TintingPostModal from '@/modules/clients/components/TintingPostModal.vue'
import GasPostModal from '@/modules/clients/components/GasPostModal.vue'
import InsurancePostModal from '@/modules/clients/components/InsurancePostModal.vue'
import { useTranslations } from '@/modules/clients/composables/useTranslations'
import { addMonths } from '@/shared/utils'
import type { TabProps } from '@/shared/components/BaseTab/types'

const { t } = useTranslations()
const tabs: TabProps[] = [
  {
    label: 'additionalInformation',
    to: { name: 'clients_vehicles_show', hash: '#additional-information' }
  },
  {
    label: 'vehicleOwner',
    to: { name: 'clients_vehicles_show', hash: '#vehicle-owner' }
  },
  {
    label: 'menu.notes',
    to: { name: 'clients_vehicles_show', hash: '#notes' }
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
const additionalInfoDataSource = [
  {
    id: 'vehicleColor',
    label: 'Цвет авто',
    value: 'Асфальт'
  },
  {
    id: 'fuelType',
    label: 'Тип топлива',
    value: 'Бензин'
  },
  {
    id: 'transmission',
    label: 'Коробка передач',
    value: 'Механическая'
  },
  {
    id: 'vin',
    label: 'VIN  номер',
    value: '12345678901234'
  }
]
const notes = [
  {
    id: 'powerOfAttorney',
    title: 'Доверенность',
    date: addMonths(new Date(), 2).toString(),
    description: 'Доверенность на управление автомобилем',
    total: 365
  },
  {
    id: 'techInspection',
    title: 'Техосмотр',
    date: addMonths(new Date(), 4).toString(),
    description: 'Техосмотр на автомобиль',
    total: 365
  },
  {
    id: 'tinting',
    title: 'Тонировка',
    date: addMonths(new Date(), 6).toString(),
    description: 'Тонировка автомобиля',
    total: 365
  },
  {
    id: 'gas',
    title: 'Газ',
    date: addMonths(new Date(), 7).toString(),
    description: 'Информации о газа не обнаружено',
    total: 365
  },
  {
    id: 'insurance',
    title: 'Страховка',
    date: addMonths(new Date(), 8).toString(),
    description: 'Страховка на автомобиль',
    total: 365
  }
] as const

const noteModals: Record<(typeof notes)[number]['id'], boolean> = reactive({
  powerOfAttorney: false,
  techInspection: false,
  tinting: false,
  gas: false,
  insurance: false
})

const handleDelete = () => {
  showDeleteModal.value = true
}

const handleNoteClick = (noteId: (typeof notes)[number]['id']) => {
  noteModals[noteId] = true
}
</script>

<template>
  <TheDeleteModal
    v-model="showDeleteModal"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.confirm')"
  />
  <PowerOfAttorneyPostModal v-model:show="noteModals.powerOfAttorney" />
  <TechInspectionPostModal v-model:show="noteModals.techInspection" />
  <TintingPostModal v-model:show="noteModals.tinting" />
  <GasPostModal v-model:show="noteModals.gas" />
  <InsurancePostModal v-model:show="noteModals.insurance" />

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
        <BaseList title="Дополнителная информация" :data-source="additionalInfoDataSource" />
      </template>
      <template #tab-1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ex exercitationem id
          inventore iure laborum nemo omnis praesentium ratione repellendus rerum, sapiente tempora,
          voluptatibus! Adipisci aspernatur beatae delectus eaque ex, illo iusto magni pariatur
          repudiandae ullam? Debitis hic illum molestias nobis obcaecati placeat quo? Aspernatur,
          at, fuga. A in ipsum maiores porro quam quas, quis recusandae sed sunt tenetur. Accusamus
          aliquam atque doloremque enim id, in ipsum maxime modi nemo, nihil, pariatur provident
          quasi voluptatem. Magnam modi nesciunt, quam rerum tenetur voluptatem voluptatum!
          Deleniti, dolorum exercitationem, explicabo facilis illo mollitia nostrum obcaecati
          possimus praesentium quam quas, quibusdam saepe vel vitae.
        </p>
      </template>
      <template #tab-2>
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <BaseNoteCard
            v-for="note in notes"
            :key="note.id"
            :title="note.title"
            :date="note.date"
            :description="note.description"
            :total="note.total"
            @click="handleNoteClick(note.id)"
          />
        </div>
      </template>
    </BaseTab>
  </BaseCard>
</template>
