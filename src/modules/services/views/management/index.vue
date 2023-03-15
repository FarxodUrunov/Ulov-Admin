<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ManagementPostModal from '@/modules/services/components/ManagementPostModal.vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import BaseTable from '@/shared/components/BaseTable/BaseTable.vue'
import BaseBadge from '@/shared/components/BaseBadge/BaseBadge.vue'
import BaseAvatar from '@/shared/components/BaseAvatar/BaseAvatar.vue'
import { useTranslations } from '@/modules/services/composables/useTranslations'
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/modules/services/store/service'
import { dateFormat } from '@/shared/utils/index'
import type { ColumnType } from '@/shared/components/BaseTable/types'

const { t } = useTranslations()

const router = useRouter()
const route = useRoute()

// store
const store = useServiceStore()
const { fetchServiceAll } = store
const { serviceData } = storeToRefs(store)
//

const showPostModal = ref(false)
const searchValue = ref('')
const sortValue = ref('asc')

// table

type Sort = {
  sort: string
  column: string
}

const columns: ColumnType[] = [
  { minWidth: 50, sort: true, title: 'ID', dataIndex: 'id', key: 'id' },
  { minWidth: 200, sort: true, title: 'Название компании', dataIndex: 'branch', key: 'id' },
  { minWidth: 220, sort: true, title: 'Тип сервиса', dataIndex: 'type_service', key: 'id' },
  { minWidth: 170, sort: true, title: 'Номер заказа', dataIndex: 'number_of_card', key: 'id' },
  { minWidth: 170, sort: true, title: 'Время заказа', dataIndex: 'order_time', key: 'id' },
  { minWidth: 150, sort: true, title: 'Обшая цена', dataIndex: 'price', key: 'id' },
  { minWidth: 150, sort: true, title: 'Механик', dataIndex: 'mechanic', key: 'id' },
  { minWidth: 150, sort: true, title: 'Колво сервиса', dataIndex: 'number_of_services', key: 'id' },
  { minWidth: 200, sort: true, title: 'Пробег на момент', dataIndex: 'distance', key: 'id' },
  { minWidth: 150, sort: false, title: 'Статус', dataIndex: 'status', key: 'id' },
  { minWidth: 150, sort: true, title: 'Единица', dataIndex: 'unit', key: 'id' }
]
const loading = ref(false)
const isLastPage = ref(false)
const limitList = ref(50)

const action = {
  edit: true,
  delete: true,
  duplicate: true
}

const handleAction = async (event: any) => {
  if (event.action === 'load-more') {
    // await fetchData(event.data / event.limit + 1, event.limit)
  }
  if (event.action === 'load-less') {
    if (event.data - event.limit > 0) {
      // await fetchDataUp(Math.floor((event.data - event.limit) / event.limit), event.limit)
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
  router.push(`${route.path + '/show/:' + event.id}`)
}

const handleDelete = () => {
  console.log('delete')
}

const handleColumnSelect = (event: any) => {
  console.log(event)
}

//

onMounted(async () => {
  // await fetchData(1, 10)
  fetchServiceAll()
})

watchEffect(() => {
  console.log(serviceData.value)
})
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold text-dark-light">{{ t('menu.servicesManagement') }}</h2>
    <div class="mt-4 mb-6">
      <TheTableHeader
        v-model:search="searchValue"
        v-model:sort="sortValue"
        @add="showPostModal = true"
      />
      <div class="my-4">
        <BaseTable
          name="service"
          selectable
          track-key="id"
          :columns="columns"
          :data-source="serviceData"
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
          <template #cell(branch)="{ data }">
            <div class="w-full flex items-center gap-2">
              <BaseAvatar
                :src="
                  data.source.branch.logo !== null
                    ? data.source.branch.logo
                    : data.source.branch.name
                "
                alt="logo"
                size="xs"
                rounded
              />
              <p>{{ data.source.branch.name }}</p>
            </div>
          </template>
          <template #cell(type_service)="{ data }">
            {{ data.source.service.tag_group }}
          </template>
          <template #cell(mechanic)="{ data }">
            {{ data.source.service.mechanic }}
          </template>
          <template #cell(order_time)="{ data }">
            <div>
              <h3 class="text-sm">{{ dateFormat(data.source.created_at).date }}</h3>
              <p class="text-xs text-dark-light">{{ dateFormat(data.source.created_at).time }}</p>
            </div>
          </template>
          <template #cell(status)="{ data }">
            <div>
              <BaseBadge :text="data.source.status" :variant="data.source.status" />
            </div>
          </template>
          <template #cell(unit)="{ data }">
            {{ data.source.service.part_amount + ' ' + data.source.service.type_of_measure }}
          </template>
        </BaseTable>
      </div>
    </div>
    <ManagementPostModal v-model:show="showPostModal" />
  </div>
</template>
