<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import FilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import SingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import TheTableHeaderFilters from './components/TheTableHeaderFilters.vue'
import { useTranslations } from './composables/useTranslations'
import type { FilterType } from './types'

const props = withDefaults(
  defineProps<{
    sort: any
    search?: any
    appliedFilters?: FilterType[]
    variant?: 'table' | 'statistics'
  }>(),
  {
    appliedFilters: () => [],
    variant: 'table'
  }
)
const emit = defineEmits([
  'update:search',
  'update:sort',
  'add',
  'applyFilters',
  'deleteFilter',
  'resetFilters'
])

const { t } = useTranslations()

const items = computed(() => {
  if (props.variant === 'statistics') {
    return [
      { id: 'today', name: 'sort.today' },
      { id: 'thisWeek', name: 'sort.thisWeek' },
      { id: 'thisMonth', name: 'sort.thisMonth' }
    ]
  } else {
    return [
      { id: 'asc', name: 'sort.asc' },
      { id: 'desc', name: 'sort.desc' },
      { id: 'byRegistration', name: 'sort.byRegistration' }
    ]
  }
})

const isFilterOpen = ref<boolean>(false)

const searchValue = computed({
  get: () => props.search,
  set: (value) => emit('update:search', value)
})

const sortValue = computed({
  get: () => props.sort,
  set: (value) => emit('update:sort', value)
})

const handleFilterOpen = () => {
  isFilterOpen.value = !isFilterOpen.value
}
</script>

<template>
  <div
    class="flex flex-wrap flex-col sm:items-center justify-center gap-4 sm:gap-6 rounded-lg bg-white py-3 px-4"
    :class="
      variant === 'table' ? 'lg:flex-row lg:justify-between' : 'sm:flex-row sm:justify-between'
    "
  >
    <div class="sm:flex flex-wrap items-center md:justify-start gap-3 lg:mr-auto">
      <BaseButton
        data-test="filter-button"
        class="sm:w-auto w-full"
        size="sm"
        :variant="isFilterOpen ? 'gray-light' : 'primary'"
        :icon="{ name: 'filter', position: 'left', className: 'w-5 h-5' }"
        @click="handleFilterOpen"
      >
        {{ t('buttons.filter') }}
      </BaseButton>
      <FilterInput
        v-if="variant === 'table'"
        v-model="searchValue"
        id="filterSearch"
        name="filterSearch"
        class="w-full sm:w-auto mt-3 sm:mt-0"
        :placeHolder="t('form.search')"
        bgColor="light"
        search
      />
    </div>
    <div class="flex flex-wrap items-center md:justify-start gap-3 lg:ml-auto">
      <h2 class="font-semibold">
        {{ variant === 'table' ? t('sorting') : t('buttons.show') }}
      </h2>
      <SingleSelect
        v-model="sortValue"
        id="filterSort"
        name="filterSort"
        mode="filter"
        class="sm:max-w-[200px] w-full"
        :fieldNames="{ key: 'id', label: 'name' }"
        :options="
          items.map((item) => ({
            id: item.id,
            name: t(item.name)
          }))
        "
      />
      <BaseButton
        v-if="variant === 'table'"
        data-test="table-header-add"
        class="sm:w-auto w-full"
        size="sm"
        :icon="{ name: 'plus', position: 'left', className: 'w-5 h-5' }"
        @click="emit('add')"
      >
        {{ t('buttons.add') }}
      </BaseButton>
    </div>
  </div>
  <template v-if="isFilterOpen">
    <div data-test="filters-section" class="rounded-lg bg-white py-3 px-4 my-4 z-50">
      <TheTableHeaderFilters
        :applied-filters="appliedFilters"
        @apply-filters="emit('applyFilters')"
        @delete-filter="emit('deleteFilter', $event)"
        @reset-filters="emit('resetFilters')"
      />
      <div data-test="slot" class="flex flex-wrap gap-4 mt-4">
        <slot />
      </div>
    </div>
  </template>
</template>
