###### Base SingleSelect Usage

## Accepts: props, that is:

1. id - required, it should be unique
2. name - required, it should be unique
3. fieldNames - required, you should pass key to work select based on it and label to show
4. label - optional, label of select input
5. size - optionaj, values = "lg" | "md" | "sm";
   default: lg
6. error - optional, type = boolean, default:false,
7. message - optional, message of error, it shows only error=true
8. disabled - optional, type = boolean, default:false,
9. success - optional, type = boolean, default:false,
10. options - optional, type = Array<Object>, default:[], you pass list of items,
11. search - optional, type=boolean, default:false, to search new items
12. searchPlaceHolder - optional, type = string, in search mode you can use it
13. mode - optional, type = 'filter'|'', default:'', to switch input mode
14. loading - optional, type = boolean, default:false
15. searchLoading - optional, type = boolean, default:false
16. deletable - optional, type = boolean, default: false, to switch on & off deletable functionality
    You can get value (key type value) by v-model as usual and it is required, you can see examples below:

## Events: search, select

1. search - gets search term
2. select - gets selected items

Basic usage:

```ts
<script setup lang="ts">
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import { ref } from 'vue'
const items = [
  { id: 1, name: 'John okhun ' },
  { id: 2, name: 'Doe ' },
  { id: 3, name: 'Jack' },
  { id: 4, name: 'Maria ' },
  { id: 5, name: 'Sofia ' },
  { id: 6, name: 'Bebegim' },
  { id: 7, name: 'Nazli' },
  { id: 8, name: 'Elif' },
  { id: 9, name: 'Polat' }
]
const item = ref<string[] | number[]>([2, 6])
const handleClick = () => {
  item.value = []
}
const handleSelect = (event: any) => {
}
const handleSearch = (event: any) => {
}
</script>
<template>

    <BaseMultiSelect
      id="select1"
      name="select1"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      @select="handleSelect"
      @search="handleSearch"
      search
      searchPlaceHolder="Search something"
      mode="filter"
    />
    <BaseMultiSelect
      id="select1"
      name="select1"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      @select="handleSelect"
      @search="handleSearch"
      search
      searchPlaceHolder="Search something"
    />
    <BaseMultiSelect
      id="select1"
      name="select1"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      @select="handleSelect"
      @search="handleSearch"
      search
      searchPlaceHolder="Search something"
      loading
    />
    <BaseMultiSelect
      id="select1"
      name="select1"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      @select="handleSelect"
    />
    <BaseMultiSelect
      id="select2"
      name="select2"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      :success="true"
      @select="handleSelect"
    />
    <BaseMultiSelect
      id="select3"
      name="select3"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      :error="true"
      message="Error happened"
      @select="handleSelect"
    />
    <BaseMultiSelect
      id="select4"
      name="select4"
      label="Select item"
      :options="items"
      :fieldNames="{ key: 'id', label: 'name' }"
      v-model="item"
      :disabled="true"
      @select="handleSelect"
    />
</template>

```
