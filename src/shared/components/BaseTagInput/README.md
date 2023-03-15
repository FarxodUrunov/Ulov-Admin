//////// BaseTagInput Usage //////////

This component uses:

Props:

1. id - required, it should be unique
2. name - required, it should be unique
3. label - optional, label of input
4. size - optionaj, values = "lg" | "md" | "sm";
   default: lg
5. error - optional, type = boolean, default:false,
6. message - optional, message of error, it shows only error=true
7. disabled - optional, type = boolean, default:false,
8. readonly - optional, type = boolean, default:false,
9. success - optional, type = boolean, default:false,
10. fieldNames - required, type = object, example: {key:'id',label:''}, here, key - tracker, label - visible label to users
11. searchTags - required, type = Array, default=[], search result

Emits:

1. @select - get selected or created tags list by key value
2. @search - gets search term for new tag
3. @create - gets tag title to create new tag

You can get list of selected tags value by v-model as usual, you can see examples below:

Basic usage:

```vue
<script setup lang="ts">
import BaseTagInput from '@/shared/components/BaseTagInput/BaseTagInput.vue'
import { ref, computed } from 'vue'

const tags = ref([
  { id: 1, name: 'Wash' },
  { id: 2, name: 'Clean' },
  { id: 3, name: 'Change motor' },
  { id: 4, name: 'Oil change' },
  { id: 5, name: 'Dwigatel' },
  { id: 6, name: 'Porshen' }
])

const tagModel: any = ref([])
const search: any = ref([])

const handleSelect = (tag: string) => {}

const handleSearch = (term: string) => {
  if (term) {
    const temp = computed(() => {
      return tags.value.filter((el) =>
        el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
      )
    })
    search.value = temp.value
  }
}

const handleCreate = (event: string) => {
  tags.value.push({ id: tags.value[tags.value.length - 1].id + 1, name: event })
  tagModel.value.push({ id: tags.value[tags.value.length - 1].id + 1, name: event })
}
</script>

<template>
  <BaseTagInput
    v-model="tagModel"
    :searchTags="search"
    :field-names="{ key: 'id', label: 'name' }"
    id="tagid"
    name="taginput"
    label="Enter tags"
    @select="handleSelect"
    @search="handleSearch"
    @create="handleCreate"
  />
</template>
```
