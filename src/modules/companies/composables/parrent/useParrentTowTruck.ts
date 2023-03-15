import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/modules/companies/store/company'
import { useIinformationOfCompany } from '@/modules/companies/store/informationOfCompany'
import type { ColumnType } from '@/shared/components/BaseTable/types'
interface Sort {
  sort: string
  column: string
}

export const useParrentTowTruck = () => {
  const showModal = ref(false)
  const confirmModal = ref(false)
  const deleteId = ref(0)
  const router = useRouter()
  const route = useRoute()

  const store = useCompanyStore()
  const { fetchTowTruckAll, deleteCompany, fetchCompanyOne } = store
  const { towTruckAllData, loading } = storeToRefs(store)

  const infoStore = useIinformationOfCompany()
  const { fetchServicesTagAll } = infoStore

  const searchValue = ref('')
  const sortValue = ref('asc')

  const columns: ColumnType[] = [
    { minWidth: 70, sort: true, title: 'ID', dataIndex: 'id', key: 'id' },
    { minWidth: 240, sort: true, title: 'Название компании', dataIndex: 'name', key: 'id' },
    { minWidth: 150, sort: false, title: 'График работы', dataIndex: 'working_time', key: 'id' },
    { minWidth: 170, sort: false, title: 'Номер телефона', dataIndex: 'phone', key: 'id' },
    { minWidth: 200, sort: true, title: 'Зона обслуживаниу', dataIndex: 'address', key: 'id' },
    { minWidth: 200, sort: true, title: 'Дата регистрация', dataIndex: 'created_at', key: 'id' },
    { minWidth: 150, sort: false, title: 'Подписка', dataIndex: 'is_free', key: 'id' },
    { minWidth: 100, sort: true, title: 'Рейтинг', dataIndex: 'rating', key: 'id' },
    { minWidth: 350, sort: true, title: 'Тип сервиса', dataIndex: 'services', key: 'id' }
  ]
  // const loading = ref(false)
  const isLastPage = ref(false)
  // const limitList = ref(50)

  const action = {
    edit: true,
    delete: true,
    duplicate: true
  }

  const handleAction = async (event: any) => {
    // console.log(event)
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
    if (event.action === 'delete') {
      confirmModal.value = true
      deleteId.value = event.data.id
    } else if (event.action === 'edit') {
      showModal.value = true
      fetchCompanyOne(event.data.id)
    }
  }

  const handelConfirm = () => {
    deleteCompany(deleteId.value).then((res: any) => {
      if (res.value === 200) {
        confirmModal.value = false
        fetchTowTruckAll()
      }
    })
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
    // console.log('delete')
  }

  const handleColumnSelect = (event: any) => {
    console.log(event)
  }

  return {
    searchValue,
    sortValue,
    showModal,
    confirmModal,
    columns,
    towTruckAllData,
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
    fetchTowTruckAll,
    fetchServicesTagAll
  }
}
