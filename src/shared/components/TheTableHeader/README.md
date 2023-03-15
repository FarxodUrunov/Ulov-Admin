## TheTableHeader Component

### This component accepts these props:

```ts
import type { FilterType } from '@/shared/components/TheTableHeader/types'

interface Props {
  search: any
  sort: any
  appliedFilters?: FilterType[]
  variant?: 'statistics' | 'table'
}
```

## Emittors: 'update:search', 'update:sort', 'add', 'applyFilters', 'deleteFilter', 'resetFilters'

### Examples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'

const appliedFilters = ref([
  { id: 1, name: 'Jack', key: 'name' },
  { id: 2, name: 'UserId', key: 'id' },
  { id: 3, name: 'Text', key: 'body' },
  { id: 4, name: 'Text', key: 'body' },
  { id: 5, name: 'Text', key: 'body' },
  { id: 6, name: 'Text', key: 'body' }
])

const searchValue = ref('')
const sortValue = ref('')

const handleAdd = () => {
  console.log('add item')
}

const handleFiltersApply = () => {
  console.log('apply filters')
}

const handleFilterDelete = (id: number) => {
  console.log('delete filter', id)
}

const handleFiltersReset = () => {
  console.log('reset filters')
}
</script>
<template>
  <div>
    <TheTableHeader
      v-model:search="searchValue"
      v-model:sort="sortValue"
      :applied-filters="appliedFilters"
      @add="handleAdd"
      @apply-filters="handleFiltersApply"
      @delete-filter="handleFilterDelete"
      @reset-filters="handleFiltersReset"
    >
      <div class="flex flex-wrap justify-center items-center gap-2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, at beatae error, et
          fuga illum ipsum iure obcaecati officiis porro quam ratione veritatis. Architecto iure
          repellendus reprehenderit! Accusantium aliquam aspernatur consequatur culpa deleniti
          distinctio dolore dolores eius et eum eveniet explicabo hic ipsam, ipsum iure iusto nihil
          nisi nulla perferendis sed sequi tempora tempore velit! Ab cum doloremque, enim impedit
          iure nemo neque pariatur! A consequuntur cumque doloremque enim et exercitationem id
          itaque iure iusto magnam minima nihil quam, quos recusandae reprehenderit repudiandae
          saepe soluta tenetur voluptas voluptates. A amet blanditiis deserunt dicta facilis fugit
          ipsum odio repellendus tempore tenetur?
        </p>
      </div>
    </TheTableHeader>
  </div>
</template>
```
