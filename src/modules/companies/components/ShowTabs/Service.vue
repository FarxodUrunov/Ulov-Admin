<script setup lang="ts">
import TheBadgeList from '@/shared/components/TheBadgeList/TheBadgeList.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'

const { t } = useTranslations()

const consumables = [
  'Промывка инжектора топливной системы',
  'Замена воздушного фильтра',
  'Ремень ГРМ',
  'Свечи зажигания/накаливания',
  'Стеклоочиститель, стеклоомыватель',
  'Сцепление МТ - проверка',
  'Щетки стеклоочистителя',
  'Замена топливного фильтра',
  'Замена свечей зажигания',
  'Доливка антифриза',
  'Замена ремня двигателя',
  'Замена тормозных колодок',
  'Замена тормозных дисков',
  'Замена салонного фильтра электрооборудование',
  'Заправка хладагента кондиционера',
  'Подкачка тормозной жидкости',
  'Замена маслы КПП',
  'Электрооборудование',
  'Замена аккумуляторной батареии',
  'Доливка жидкостя стеклоочистителя'
]

const engineItems = [
  'Поршень шатуны',
  'Кольца поршневые',
  'Замена прокладок',
  'Замена поршня',
  'Замена кольца',
  'Ремонт Система смазки',
  'Блок цилиндров',
  'Опора ДВС',
  'Коленчатый вал, шкив, маховик',
  'Турбонагнетатель',
  'Клапан',
  'Система охлаждения двигателя',
  'Приводной нагнетатель',
  'Система питания'
]
</script>

<template>
  <h3 class="text-xl lg:text-2xl font-bold text-dark mb-4">{{ t('service') }}</h3>
  <p class="text-dark-light text-base font-semibold mb-2">Тип Эвакуации</p>
  <TheBadgeList :items="consumables" variant="secondary" />

  <p class="text-dark-light text-base font-semibold mt-6 mb-2">Двигатель</p>
  <TheBadgeList :items="engineItems" variant="secondary" />

  <div class="mt-6 border-t border-t-gray-light">
    <h3 class="text-lg font-semibold text-dark my-4">{{ t('serviceBrands') }}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="n in 16" :key="n">
        <p class="text-base font-normal text-dark-light truncate">
          - Lorem ipsum dolor sit amet {{ n }}
        </p>
      </div>
    </div>
  </div>
</template>
