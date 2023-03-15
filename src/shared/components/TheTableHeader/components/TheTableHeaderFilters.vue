<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import type { FilterType } from '../types'

withDefaults(defineProps<{ appliedFilters?: FilterType[] }>(), {
  appliedFilters: () => []
})
const emit = defineEmits(['applyFilters', 'deleteFilter', 'resetFilters'])

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col md:flex-row item-start gap-4 border-b border-gray-light pb-3">
    <div
      v-if="Array.isArray(appliedFilters) && appliedFilters.length"
      class="flex-1 flex flex-wrap justify-center items-start md:justify-start md:items-end gap-2"
    >
      <div
        v-for="filter in appliedFilters"
        :key="filter.id"
        class="min-w-[65px] min-h-[24px] flex items-center bg-blue-100 text-xs rounded-md py-1.5 px-2"
      >
        <span data-test="filter-name" class="text-xs mr-1">{{ filter.name }}</span>
        <BaseIcon
          data-test="delete-filter"
          name="close"
          class="w-4 h-4 text-gray-dark cursor-pointer"
          @click="emit('deleteFilter', filter.id)"
        />
      </div>
    </div>
    <div class="flex items-center gap-2">
      <BaseButton
        data-test="apply-filters"
        size="sm"
        variant="secondary"
        @click="emit('applyFilters')"
      >
        {{ t('buttons.applyFilter') }}
      </BaseButton>
      <BaseButton
        data-test="reset-filters"
        size="sm"
        variant="gray-light"
        class="w-10 h-10 md:w-11 md:h-11 !min-h-0 !p-0"
        :icon="{
          name: 'rotateLeftOutline',
          className: 'w-7 h-7 rounded-lg text-white bg-primary p-1'
        }"
        :has-default-slot="false"
        @click="emit('resetFilters')"
      />
    </div>
  </div>
</template>
