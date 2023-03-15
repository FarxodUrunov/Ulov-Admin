## BaseStatisticsCard Component

### This component accepts these props:

```ts
title: string
staticsNumber: number
staticsPercent: number
growthDescendStatus: 'arrowGrowth' | 'arrowDescend' | 'arrowUnchanged'
isActive: boolean
```

### Examples

```ts
<script setup lang="ts">
import BaseStatisticsCard from '@/shared/components/BaseStatisticsCard/BaseStatisticsCard.vue'
import { ref } from 'vue'

export interface Data {
  id: number
  active: boolean
  title: string
  number: number
  percent: number
  status: 'arrowGrowth' | 'arrowDescend' | 'arrowUnchanged'
}

const data = ref<Data[]>([
  { id: 1, active: true, title: 'Доходность сервисов', number: 10254, percent: 42, status: 'arrowGrowth' },
  { id: 2, active: false, title: 'Количество автосервисы', number: 254, percent: 25, status: 'arrowDescend' },
  { id: 3, active: false, title: 'Обслуживаемые автомобили', number: 1024, percent: 0, status: 'arrowUnchanged' },
  { id: 4, active: false, title: 'Филиали автосервиса', number: 1254, percent: 12, status: 'arrowGrowth' },
  { id: 5, active: false, title: 'Количество сервис карты', number: 1254, percent: 12, status: 'arrowGrowth' },
  { id: 6, active: false, title: 'Вызовной сервис', number: 1254, percent: 12, status: 'arrowGrowth' }

])

const onClick = (id: number) => {
  data.value.map((item) => {
    if (item.id === id) {
      item.active = true
    } else {
      item.active = false
    }
  })
}
</script>
```

```vue
<template>
  <div class="p-4 bg-gray-light h-screen">
    <div class="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
      <BaseStatisticsCard
        v-for="item in data"
        :key="item.id"
        @click="onClick(item.id)"
        :title="item.title"
        :staticsNumber="item.number"
        :staticsPercent="item.percent"
        :growthDescendStatus="item.status"
        :isActive="item.active"
      />
    </div>
  </div>
</template>
```
