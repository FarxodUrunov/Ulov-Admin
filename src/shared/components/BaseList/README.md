## BaseList Component

### This component accepts these props:

```ts
interface BaseListProps {
  dataSource: { [key: string]: string | number }
}
```

### Examples

```vue
<script setup lang="ts">
const dataSource = {
  service_type: 'Service type',
  service_name: 'Service name',
  parts: 'Car parts',
  unit: '3 units',
  milleage_service: '100 000 km',
  mechanic: 'John Doe',
  price: '620 000 sum'
}
</script>

<template>
  <BaseList :data-source="dataSource" />
</template>
```
