## BaseTable Usage

### This component accepts these props:

```ts
import type { ActionType, ColumnType } from '@/shared/components/BaseTable/types'

interface BaseTable {
  columns: ColumnType[]
  dataSource: any[]
  trackKey: string
  name: string
  bordered?: boolean
  action?: ActionType | undefined
  selectable?: boolean
  loading?: boolean
  pagination?: boolean
  resetPagination?: boolean
}
```

#### Default props:

- bordered: false,
- selectable: false,
- loading: false,
- pagination: false,
- resetPagination: false

#### Props description:

- name: name for Table, so when selected columns list set to localStorage, it sets with this name, that is it should be unique name for each table
- columns: used to build table columns, it is a array of object that has required and optional properties: ColumnType[]
- dataSource: it is list of data shown on the table
- trackKey: it is a unique key (like id of every table row), so you can select and do other things based on trackKey, it is required
- action: action list for table row
- selectable: makes table selectable, by default table is not selectable
- loading: loading will be applied to table UI
- bordered: table borders will be visible
- pagination: shows pagination, when there is no data to fetch, should be false
- resetPagination: resets pagination state, when you just change the value of resetPagination prop

#### Emits list with description:

```ts
type Sort = {
  sort: string
  column: string
}
```

- action : emits action type and row data, when action menu button clicked
- sort - Sort : emits sort type by column, when table header column sort icon clicked
- rowClick : emits a full row details, when a table row clicked
- delete : emits when some rows selected and delete icon clicked
- columns : emits list of columns when a column is selected to represent in table

#### Row cell Slots usage:

```vue
<template #cell(id)="{ data }">
  {{ data.source.id }}
</template>
```

here, (id) - dataIndex value and data contains index and row details

Table Usage example:

```vue
<script setup lang="ts">
import BaseTable from '@/shared/components/BaseTable/BaseTable.vue'
import type { ColumnType } from '@/shared/components/BaseTable/types'
import { onMounted, ref } from 'vue'

type Sort = {
  sort: string
  column: string
}

const dataSource = ref<any>([])
const columns: ColumnType[] = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'UserID', dataIndex: 'userId', key: 'id' },
  { title: 'Title', dataIndex: 'title', key: 'id' },
  { title: 'Body', dataIndex: 'body', key: 'id' }
]
const loading = ref(false)
const isLastPage = ref(false)
const limitList = ref(50)

const action = {
  edit: true,
  delete: true,
  duplicate: true
}

onMounted(async () => {
  await fetchData(1, 10)
})

const fetchData = (page: number, limit: number) => {
  loading.value = true
  let temp: any = []
  temp = dataSource.value

  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        if (temp.length + data.length > limitList.value) {
          dataSource.value = [...temp.slice(limit), ...data]
        } else {
          dataSource.value = [...temp, ...data]
        }
        if (data.length === 0 || (page && limit > data.length)) {
          console.log('last page')

          isLastPage.value = true
        }
      }
    })
    .finally(() => (loading.value = false))
}

const fetchDataUp = async (params: number, limit: number) => {
  loading.value = true
  let temp: any = []
  if (params && limit) {
    temp = dataSource.value
  }

  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${params}&_limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data)) {
        if (temp.length + data.length > limitList.value) {
          dataSource.value = [...data, ...temp.slice(0, limit)]
        } else {
          dataSource.value = [...data, ...temp]
        }
        // if (data.length === 0 || (params && limit.value > data.length)) {
        //   isLastPage.value = true
        // }
      }
    })
    .finally(() => (loading.value = false))
}

const handleAction = async (event: any) => {
  if (event.action === 'load-more') {
    await fetchData(event.data / event.limit + 1, event.limit)
  }
  if (event.action === 'load-less') {
    if (event.data - event.limit > 0) {
      await fetchDataUp(Math.floor((event.data - event.limit) / event.limit), event.limit)
    } else {
      // isLastPage.value = false
    }
  }
}

const handleSelect = (event: any) => {
  console.log(event)
}

const handleSort = (event: Sort) => {
  console.log(event)
}

const handleRowClick = (event: any) => {
  // console.log(event)
}

const handleDelete = () => {
  console.log('delete')
}

const handleColumnSelect = (event: any) => {
  console.log(event)
}
</script>
<template>
  <div class="py-10">
    <div class="mt-10 mx-10">
      <BaseTable
        name="company"
        selectable
        track-key="id"
        :columns="columns"
        :data-source="dataSource"
        :action="action"
        :loading="loading"
        :pagination="!isLastPage"
        :resetPagination="isLastPage"
        @action="handleAction"
        @select="handleSelect"
        @sort="handleSort"
        @rowclick="handleRowClick"
        @delete="handleDelete"
        @columns="handleColumnSelect"
      >
      </BaseTable>
    </div>
  </div>
</template>
```
