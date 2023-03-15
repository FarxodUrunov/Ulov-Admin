The BaseChart component must be given 2 required and 2 optional props

1.The dataSeries prop is mandatory and it accepts numbers for the chart
2.The dataCategories props is mandatory and it accepts the categories for the chart

```vue
<script setup lang="ts">
import BaseChart from '@/shared/components/BaseChart/BaseChart.vue'

const categories = ['Пд', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const data = [100, 970, 410, 200, 790, 150, 900]
</script>

<template>
  <main class="container mx-auto my-4 flex">
    <BaseChart
      class="w-1/2"
      :dataSeries="data"
      :dataCategories="categories"
      colorLine="#04009a"
      bgColorLine="#21a2ff"
    />
  </main>
</template>
```
