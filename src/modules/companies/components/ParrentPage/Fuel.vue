<script setup lang="ts">
import { onMounted } from 'vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import BaseTable from '@/shared/components/BaseTable/BaseTable.vue'
import BaseAvatar from '@/shared/components/BaseAvatar/BaseAvatar.vue'
import BaseBadge from '@/shared/components/BaseBadge/BaseBadge.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import CompanyPostModal from '@/modules/companies/components/CompanyPostModal.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import { useParrentFuel } from '@/modules/companies/composables/parrent/useParrentFuel'
import { dateFormat } from '@/shared/utils/index'

const { t } = useTranslations()

const {
  searchValue,
  sortValue,
  showModal,
  confirmModal,
  columns,
  fuelAllData,
  action,
  loading,
  isLastPage,
  handelConfirm,
  handleAction,
  handleSelect,
  handleSort,
  handleRowClick,
  handleDelete,
  handleColumnSelect,
  fetchFuelAll,
  fetchServicesTagAll
} = useParrentFuel()

onMounted(async () => {
  fetchFuelAll()
  // fetchServicesTagAll()
})
</script>

<template>
  <div class="mt-4 mb-6">
    <TheTableHeader v-model:search="searchValue" v-model:sort="sortValue" @add="showModal = true" />
    <div class="my-4">
      <!-- :pagination="!isLastPage" -->
      <BaseTable
        name="companies"
        selectable
        track-key="id"
        :columns="columns"
        :data-source="fuelAllData"
        :action="action"
        :loading="loading"
        :resetPagination="isLastPage"
        @action="handleAction"
        @select="handleSelect"
        @sort="handleSort"
        @rowclick="handleRowClick"
        @delete="handleDelete"
        @columns="handleColumnSelect"
      >
        <template #cell(name)="{ data }">
          <div class="w-full flex items-center gap-2">
            <BaseAvatar
              :src="data.source?.image_url !== null ? data.source?.image_url : data.source?.name"
              alt="logo"
              size="xs"
              rounded
            />
            <p>{{ data.source.name }}</p>
          </div>
        </template>
        <template #cell(services)="{ data }">
          <div class="flex items-end gap-2">
            <div class="flex items-center gap-2 max-w-xs overflow-hidden">
              <template v-for="(item, i) in data.source?.services" :key="i + item">
                <BaseBadge v-if="item" :text="item" />
              </template>
            </div>
            {{ data.source?.services.length > 2 ? '...' : '' }}
          </div>
        </template>
        <template #cell(working_time)="{ data }">
          <div>
            <h3 class="text-sm">
              <span>{{ t(`days.${data.source?.working_time?.days[0]}`) + '-' }}</span>
              <span>{{
                t(
                  `days.${
                    data.source?.working_time?.days[data.source?.working_time?.days?.length - 1]
                  }`
                )
              }}</span>
            </h3>
            <p class="text-xs text-dark-light">
              <span>{{ data.source?.working_time?.start_time?.slice(0, 5) }}</span>
              <span>{{ '-' + data.source?.working_time?.end_time?.slice(0, 5) }}</span>
            </p>
          </div>
        </template>
        <template #cell(created_at)="{ data }">
          <div>
            <h3 class="text-sm">{{ dateFormat(data.source?.created_at)?.date }}</h3>
            <p class="text-xs text-dark-light">{{ dateFormat(data.source?.created_at)?.time }}</p>
          </div>
        </template>
        <template #cell(is_free)="{ data }">
          {{ data.source?.is_free ? t('free') : t('paid') }}
        </template>
      </BaseTable>
    </div>
  </div>
  <CompanyPostModal v-model:show="showModal" />
  <BaseModal
    v-model="confirmModal"
    :cancelText="t('buttons.cancel')"
    confirmVariant="error"
    :confirmText="t('buttons.confirm')"
    headerVariant="text-center p-6"
    :header-text="t('buttons.delete')"
    :confirm-loading="loading"
    @cancel="confirmModal = false"
    @confirm="handelConfirm"
  >
    <template #body>
      <p class="font-semibold text-dark-light text-center">
        Вы действительно хотите удалить этот компанию
      </p>
    </template>
  </BaseModal>
</template>
