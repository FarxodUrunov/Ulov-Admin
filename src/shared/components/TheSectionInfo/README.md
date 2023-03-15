## TheSectionInfo Component

### This component accepts these props:

```ts
import type { SectionInfoProps } from '@/shared/components/TheSectionInfo/types'
import type { CardActions } from '@/shared/components/BaseCard/types'

interface Props {
  image: SectionInfoProps['image']
  actions?: SectionInfoProps['actions']
}
```

### Examples

```vue
<script setup lang="ts">
const dataSource = [
  {
    id: 'service_type',
    label: 'Service type',
    value: 'Service type'
  },
  {
    id: 'service_name',
    label: 'Service name',
    value: 'Service name'
  }
]

const handleEdit = () => {
  console.log('edit')
}

const handleDelete = () => {
  console.log('delete')
}
</script>

<template>
  <TheSectionInfo
    :image="{
      src: 'https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Service image',
      type: 'img',
      rounded: true
    }"
    :actions="{ edit: true, delete: true }"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <BaseList title="Chevrolet , Cobalt" :data-source="dataSource">
      <template #service_type="{ value }">
        <span class="capitalize text-success">{{ value }}</span>
      </template>
    </BaseList>
  </TheSectionInfo>
</template>
```

### Description

Use this component mostly with `BaseList` component. Don't worry about `BaseCard` component because it's already used inside `TheSectionInfo` component.
