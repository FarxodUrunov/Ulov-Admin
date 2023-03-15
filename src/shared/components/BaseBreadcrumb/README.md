## BaseBreadcrumb component

### This component accepts these props:

```ts
import type { BreadcrumbItemProps } from '@/shared/components/BaseBreadcrumb/composables/types'

interface Props {
  breadcrumb: BreadcrumbItemProps[]
  solid?: boolean
}
```

##### Default props:

- solid = false

### Examples

```vue
<script setup lang="ts">
const breadcrumb = [
  {
    path: '/',
    home: true,
    label: 'Статистика'
  },
  {
    path: '/settings',
    label: 'Сервисные услуги'
  },
  {
    path: '/settings',
    label: 'Отзывы'
  },
  {
    path: '/settings',
    label: 'Менежер'
  },
  {
    label: 'Абдулазиз Абдуқаххоров'
  }
]
</script>

<template>
  <Breadcrumb :breadcrumb="breadcrumb" />
</template>
```
