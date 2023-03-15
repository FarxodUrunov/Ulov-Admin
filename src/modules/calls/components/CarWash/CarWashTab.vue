<script setup lang="ts">
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import CarWashModal from './CarWashModal.vue'
import { useCarWash } from '@/modules/calls/composables/useCarWash'

const {
  showModal,
  searchValue,
  sortValue,
  appliedFilters,
  handleFiltersApply,
  handleFilterDelete,
  handleFiltersReset
} = useCarWash()
</script>

<template>
  <div class="mt-4 mb-6">
    <CarWashModal v-model:show="showModal" />
    <TheTableHeader
      v-model:search="searchValue"
      v-model:sort="sortValue"
      :applied-filters="appliedFilters"
      @add="showModal = true"
      @apply-filters="handleFiltersApply"
      @delete-filter="handleFilterDelete"
      @reset-filters="handleFiltersReset"
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tenetur aut placeat
        voluptatem vel earum.
      </div>
    </TheTableHeader>
  </div>
</template>
