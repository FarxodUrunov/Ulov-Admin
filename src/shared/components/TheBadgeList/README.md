## TheBadgeList component

### This component accepts these props:

```ts
interface Props {
  items: Array<string | number>
  variant?: 'success' | 'secondary' | 'error'
}
```

##### Default props:

- variant: 'secondary'

### Examples

```vue
<script setup lang="ts">
import TheBadgeList from '@/shared/components/TheBadgeList/TheBadgeList.vue'
import { ref } from 'vue'

const titles = ref([
  'Промывка инжектора топливной..',
  'Поршень',
  'Шатуны',
  'Кольца поршневые',
  'Замена маслы КПП',
  'Стекло - замена',
  'Диагностика',
  'Ai-80',
  'Метан',
  'Ai-95',
  5,
  6
])
</script>
<template>
  <TheBadgeList :items="titles" variant="secondary" />
</template>
```
