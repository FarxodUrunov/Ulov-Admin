## BaseWorkDays Component

### This component accepts these props:

```ts
import type { WorkDays } from '@/shared/components/BaseWorkDays/types'

interface Props {
  checkedValue: WorkDays
}
```

### Examples

```vue
<script setup lang="ts">
const workdays = ref<WorkDays>([false, false, false, false, false, false, false])
</script>

<template>
  <BaseWorkDays v-model="workdays" />
</template>
```
