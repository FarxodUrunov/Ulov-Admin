import { ref } from 'vue'
import type { FilterType } from '@/shared/components/TheTableHeader/types'

export const useCarWash = () => {
  const showModal = ref(false)
  const searchValue = ref('')
  const sortValue = ref<string | number>('asc')
  const appliedFilters = ref<FilterType[]>([])

  const handleFiltersApply = () => {
    // TODO: apply filters
    console.log('apply filters')
  }

  const handleFilterDelete = (id: FilterType['id']) => {
    // TODO: delete filter
    console.log('delete filter', id)
  }

  const handleFiltersReset = () => {
    // TODO: reset filters
    console.log('reset filters')
  }

  return {
    showModal,
    searchValue,
    sortValue,
    appliedFilters,
    handleFiltersApply,
    handleFilterDelete,
    handleFiltersReset
  }
}
