## TheRatingResults Component

### This component accept the props:

```ts
interface TheRatingResultsProps {
  rating: {
    total: number
    rating: number
    count: { excellent: number; good: number; normal: number; bad: number; worst: number }
  }
}
```

##### Default props:

- rating: {
  total: 0
  rating: 0
  count: { excellent: 0; good: 0; normal: 0; bad: 0; worst: 0 }
  }

### Examples

```vue
<script setup lang="ts">
import TheRatingResults from '@/shared/components/TheRatingResults/TheRatingResults.vue'
import { ref } from 'vue'

const data = ref({
  total: 100,
  rating: 4,
  count: { excellent: 60, good: 30, normal: 2, bad: 1, worst: 0 }
})
</script>
<template>
  <TheRatingResults :rating="data" />
</template>
```
