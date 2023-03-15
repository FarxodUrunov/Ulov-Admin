<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useScroll, useElementSize } from '@vueuse/core'
import { useBaseTable } from './composables/useBaseTable'
import TableActions from './Components/TableActions.vue'
import type { ActionType, ColumnType } from './types'

import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseCheckbox from '@/shared/components/BaseCheckbox/BaseCheckbox.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    bordered: false,
    selectable: false,
    loading: false,
    pagination: false,
    resetPagination: false
  }
)

const emit = defineEmits(['action', 'select', 'sort', 'rowclick', 'delete', 'columns'])

const target = ref()
const tableRef = ref()
const tableWrap = ref()
const { width } = useElementSize(target)
const { width: tableWidth } = useElementSize(tableRef)
const { arrivedState } = useScroll(tableWrap)

const {
  selectAll,
  selectedIds,
  customColumns,
  sortTrackList,
  tablColumnMinWidthClass,
  tableBorderClass,
  sortStatus,
  indeterminate,
  selectColumns,
  langSwitcher,
  columnCount,
  loadMore,
  rowLimit,
  perPageOptions,
  handleAction,
  handleSelect,
  handleSelectAll,
  handleSort,
  handleRowClick,
  handleDelete,
  handleColumnSelect,
  handleLoadMore
} = useBaseTable(toRefs(props), emit)
</script>

<template>
  <div class="relative" ref="tableRef">
    <div
      v-if="loading"
      class="absolute backdrop-opacity-10 backdrop-invert bg-white/50 left-0 top-0 w-full h-full flex justify-center items-center z-40"
      data-test="table-loading"
    >
      <BaseIcon
        name="loadingOutline"
        class="w-6 h-6 animate-spin text-primary/60"
        view-box="0 0 20 20"
      />
    </div>
    <div
      class="bg-white w-full px-4 py-2 flex items-center flex-wrap gap-4 rounded-t-md sticky top-0 z-40"
      :class="selectable ? 'justify-between' : 'justify-end'"
    >
      <div v-if="selectable" class="flex items-center gap-2">
        <p class="text-gray-dark text-sm font-medium">
          {{ selectedIds.size }}, {{ langSwitcher.selecteds }}
        </p>
        <button @click="handleDelete" data-test="table-row-delete">
          <BaseIcon
            name="delete"
            class="w-5 h-5"
            :class="selectedIds.size ? 'text-error' : 'text-gray cursor-not-allowed'"
          />
        </button>
      </div>
      <div class="flex gap-4 flex-col sm:flex-row">
        <BaseSingleSelect
          class="w-52"
          id="page-number"
          name="select-page-number"
          mode="filter"
          size="sm"
          v-model="rowLimit"
          :field-names="{ key: 'id', label: 'label' }"
          :options="perPageOptions"
        />
        <BaseMultiSelect
          class="w-52"
          id="select"
          name="select-name"
          :field-names="{ key: 'dataIndex', label: 'title' }"
          v-model="selectColumns"
          :options="columns"
          mode="filter"
          size="sm"
          :selectedNumber="true"
          :deletable="selectColumns.length < columnCount ? true : false"
          @select="handleColumnSelect"
        />
      </div>
    </div>
    <div class="overflow-x-auto min-h-[500px] bg-white" ref="tableWrap">
      <table class="w-full table-auto relative" ref="table">
        <thead class="w-full h-12 bg-gray-light">
          <tr
            v-if="selectable && trackKey"
            class="min-w-[40px] w-10 sticky left-0 table-cell px-2 bg-gray-light z-20"
            :class="tableBorderClass"
            :style="{ minWidth: '60px' }"
            data-test="table-head-select"
          >
            <th class="flex justify-center">
              <BaseCheckbox
                id="table-head-check"
                :model-value="selectAll"
                :indeterminate="indeterminate"
                @update:model-value="handleSelectAll"
                data-test="table-head-check"
              />
            </th>
          </tr>
          <tr
            v-for="(column, index) in customColumns"
            :key="column?.key ? column.key : index"
            class="table-cell px-2 relative group"
            :class="tableBorderClass"
            :style="{ minWidth: tablColumnMinWidthClass[index] }"
          >
            <div
              v-if="column.sort"
              class="absolute z-50 top-12 bg-black/80 rounded-md text-white p-2 text-xs opacity-0 w-0 group-hover:w-40 group-hover:opacity-100"
            >
              {{ sortStatus[index] }}
            </div>
            <th class="flex items-center gap-2" :style="{ justifyContent: column.align }">
              <h2 class="text-dark-light text-sm font-medium">{{ column.title }}</h2>
              <button
                v-if="column.sort"
                @click="handleSort(sortTrackList[index], index, column)"
                :data-test="`table-sort-${column.dataIndex}`"
              >
                <BaseIcon
                  name="sort"
                  class="w-5 h-5 text-primary transition duration-100"
                  :class="sortTrackList[index] === 'desc' ? 'rotate-180' : ''"
                  view-box="0 0 17 17"
                />
              </button>
            </th>
          </tr>
          <tr
            v-if="action"
            class="table-cell px-2 min-w-[40px] w-10 sticky right-0 bg-gray-light"
            :class="tableBorderClass"
            data-test="table-head-action"
          >
            <th class="flex justify-center">
              <BaseIcon name="actionOutline" class="w-4 h-4 rotate-90 text-dark-light" />
            </th>
          </tr>
        </thead>
        <tbody v-if="dataSource.length" class="w-full divide-gray-light divide-y">
          <tr ref="target" id="loadLessRow"></tr>
          <template v-for="(source, rowIndex) in dataSource" :key="rowIndex">
            <tr
              class="h-12 max-h-12 hover:bg-gray-light group table-row-track"
              :class="[selectedIds.has(source[trackKey]) ? 'bg-blue-200' : '']"
              data-test="table-row"
            >
              <td
                v-if="selectable && trackKey"
                class="table-cell px-2 min-w-[40px] w-10 sticky left-0 group-hover:bg-gray-light"
                :class="[
                  tableBorderClass,
                  selectedIds.has(source[trackKey]) ? 'bg-blue-200' : 'bg-white',
                  arrivedState.left ? '' : 'select-custom-shadow'
                ]"
                data-test="table-body-select"
              >
                <div class="w-full h-full flex justify-center items-center">
                  <BaseCheckbox
                    :id="`base-table-body-${rowIndex}`"
                    :model-value="selectedIds.has(source[trackKey])"
                    @update:model-value="handleSelect(source)"
                  />
                </div>
              </td>
              <td
                v-for="(col, colIndex) in customColumns"
                :key="col?.key ? col.key : colIndex"
                class="table-cell px-2"
                :class="[tableBorderClass]"
                @click.prevent="handleRowClick(source)"
              >
                <div class="flex" :style="{ justifyContent: col.align }">
                  <slot :data="{ index: rowIndex, source }" :name="`cell(${col.dataIndex})`">
                    <p class="text-dark text-sm font-normal truncate">
                      {{ source[col.dataIndex] ? source[col.dataIndex] : '' }}
                    </p>
                  </slot>
                </div>
              </td>
              <td
                v-if="action"
                class="table-cell px-2 min-w-[40px] sticky right-0 z-0 w-10 group-hover:bg-gray-light"
                :class="[
                  tableBorderClass,
                  selectedIds.has(source[trackKey]) ? 'bg-blue-200' : 'bg-white',
                  arrivedState.right ? '' : width > tableWidth ? 'action-custom-shadow' : ''
                ]"
                data-test="table-body-action"
              >
                <div class="w-full h-full flex justify-center items-center">
                  <TableActions
                    class="w-5 rounded py-1"
                    :action="action"
                    @action="handleAction($event, source)"
                  />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
        <div
          v-else
          class="absolute top-20 w-full h-full flex justify-center items-center"
          data-test="nodata"
        >
          <p class="text-sm font-normal text-gray-dark">No data Found</p>
        </div>
      </table>
    </div>
    <div v-if="pagination" id="loadMoreBtn" data-test="table-pagination">
      <div class="flex justify-center items-center my-4">
        <slot name="pagination">
          <div class="flex justify-center w-full">
            <BaseButton
              v-if="loadMore"
              size="sm"
              variant="gray-light"
              class="w-full"
              @click="handleLoadMore"
              >Load More</BaseButton
            >
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-custom-shadow:before {
  box-shadow: -20px 0 20px -20px #aaadbb inset;
  content: ' ';
  height: 100%;
  left: -20px;
  position: absolute;
  top: 0;
  width: 20px;
}
.select-custom-shadow:after {
  box-shadow: 20px 0 20px -20px #aaadbb inset;
  content: ' ';
  height: 100%;
  position: absolute;
  top: 0;
  right: -20px;
  width: 20px;
}
</style>
