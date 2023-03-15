<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseImage from '@/shared/components/BaseImage/BaseImage.vue'
import BaseList from '@/shared/components/BaseList/BaseList.vue'
import TheSectionInfo from '@/shared/components/TheSectionInfo/TheSectionInfo.vue'
import FinePostModal from '@/modules/clients/components/FinePostModal.vue'

const { t } = useI18n()
const showModal = ref(false)
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
</script>

<template>
  <FinePostModal v-model:show="showModal" />
  <h1 class="text-xl font-bold mb-4">PRA1234567890</h1>

  <TheSectionInfo title="Информация">
    <div class="flex items-center gap-4 mb-4">
      <BaseImage
        src="https://images.pexels.com/photos/1276434/pexels-photo-1276434.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
        alt="fine image 1"
        class="w-40 rounded-xl"
      />
      <BaseImage
        src="https://images.pexels.com/photos/12976017/pexels-photo-12976017.jpeg?auto=compress&cs=tinysrgb&w=840&h=500&dpr=1"
        alt="fine image 2"
        class="w-40 rounded-xl"
      />
    </div>
    <BaseList title="Номер постановления" :data-source="dataSource" class="mb-4" />
    <BaseButton class="w-full max-w-xs" @click="showModal = true">
      {{ t('buttons.pay') }}
    </BaseButton>
  </TheSectionInfo>
</template>
