## BaseAddressPicker Component

### This component accepts these props:

```ts
interface Props {
  modelValue: {
    address: string
    coords: number[]
  } | null
}
```

### Examples

```vue
<script setup lang="ts">
const address = ref(null)
</script>

<template>
  <BaseAddressPicker v-model="address" />
</template>
```
