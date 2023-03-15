<script setup lang="ts">
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import BaseCard from '@/shared/components/BaseCard/BaseCard.vue'
import BaseList from '@/shared/components/BaseList/BaseList.vue'

const dataSource = [
  {
    id: 'company_name',
    label: 'Название компании',
    value: 'AUTO REPAIR Бухара'
  },
  {
    id: 'services',
    label: 'Сервисные услуги',
    value: 'Автосервис'
  },
  {
    id: 'car_number',
    label: 'Номер автомобиля',
    value: '01A124AB'
  },
  {
    id: 'client_number',
    label: 'Телефон номер клиента',
    value: '+998901234567'
  },
  {
    id: 'service_status',
    label: 'Статус сервиса',
    value: 'В ожидании'
  },
  {
    id: 'mileage',
    label: 'Пробег на момент',
    value: '50 000 км'
  }
]
const additionalInfoDataSource = [
  {
    id: 'total_cost',
    label: 'Общая стоимость',
    value: '620 000 Сум'
  },
  {
    id: 'created_at',
    label: 'Время создания сервиса',
    value: '12.08.2022 , 12:30'
  }
]
</script>

<template>
  <h1 class="text-xl font-bold mb-4">#332003</h1>

  <BaseCard :actions="{ edit: true, delete: true }">
    <BaseList title="Обслуживание" :data-source="dataSource" />
  </BaseCard>

  <div class="grid lg:grid-cols-2 items-start gap-4 mt-4">
    <div>
      <BaseCard class="mb-4">
        <BaseList title="Сервис №1" :data-source="dataSource" />
      </BaseCard>

      <BaseCard>
        <BaseList title="Сервис №2" :data-source="dataSource" />
      </BaseCard>
    </div>
    <BaseCard class="h-full" title="Фото/Отчет">
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 mb-5"
      >
        <BaseImage
          src="https://images.pexels.com/photos/1276434/pexels-photo-1276434.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
          alt="fine image 1"
          class="rounded-xl"
        />
        <BaseImage
          src="https://images.pexels.com/photos/12976017/pexels-photo-12976017.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
          alt="fine image 2"
          class="rounded-xl"
        />
        <BaseImage
          src="https://images.pexels.com/photos/1276434/pexels-photo-1276434.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
          alt="fine image 1"
          class="rounded-xl"
        />
        <BaseImage
          src="https://images.pexels.com/photos/12976017/pexels-photo-12976017.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
          alt="fine image 2"
          class="rounded-xl"
        />
        <BaseImage
          src="https://images.pexels.com/photos/1276434/pexels-photo-1276434.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
          alt="fine image 1"
          class="rounded-xl"
        />
        <BaseImage
          src="https://images.pexels.com/photos/12976017/pexels-photo-12976017.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
          alt="fine image 2"
          class="rounded-xl"
        />
      </div>
      <BaseList title="Дополнителная информация" :data-source="additionalInfoDataSource" />
    </BaseCard>
  </div>
</template>
