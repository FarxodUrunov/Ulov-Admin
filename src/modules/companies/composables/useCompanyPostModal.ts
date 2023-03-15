import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCompanyStore } from '@/modules/companies/store/company'

export const useCompanyPostModal = (props: { show: boolean }, emit: Function) => {
  const store = useCompanyStore()
  const {
    createCompany,
    fetchCompaniesAll,
    fetchTowTruckAll,
    fetchFuelAll,
    fetchCarWashAll,
    editCompany
  } = store
  const {
    btnCompanyType,
    btnInfoType,
    btnServiceType,
    btnBrandType,
    createCompanyData,
    createdInfoData,
    createdServiceData,
    createdBrandsData,
    companyOne
  } = storeToRefs(store)

  const showModal = computed({
    get: () => props.show,
    set: (value) => {
      emit('update:show', value)
    }
  })

  const createData = computed(() => {
    if (Object.keys(companyOne.value).length) {
      if (
        companyOne.value.address.lat === createCompanyData.value.address?.lat &&
        companyOne.value.address.long === createCompanyData.value.address?.long
      ) {
        delete createCompanyData.value.address
      }
    }
    return {
      ...createCompanyData.value,
      ...createdInfoData.value,
      ...createdServiceData.value,
      ...createdBrandsData.value
    }
  })

  const handleFormSubmit = () => {
    if (Object.keys(companyOne.value).length) {
      editCompany(companyOne.value?.id, createData.value).then((res) => {
        if (res.value === 200) {
          if (createData.value.type === 'auto_service') fetchCompaniesAll()
          if (createData.value.type === 'tow_truck') fetchTowTruckAll()
          if (createData.value.type === 'auto_refueling') fetchFuelAll()
          if (createData.value.type === 'carwash') fetchCarWashAll()
          showModal.value = false
          createCompanyData.value = {}
          createdInfoData.value = {}
          createdServiceData.value = {}
          createdBrandsData.value = {}
        }
      })
    } else {
      createCompany(createData.value.type, createData.value).then((res) => {
        if (res.value === 201) {
          if (createData.value.type === 'auto_service') fetchCompaniesAll()
          if (createData.value.type === 'tow_truck') fetchTowTruckAll()
          if (createData.value.type === 'auto_refueling') fetchFuelAll()
          if (createData.value.type === 'carwash') fetchCarWashAll()
          showModal.value = false
          createCompanyData.value = {}
          createdInfoData.value = {}
          createdServiceData.value = {}
          createdBrandsData.value = {}
        }
      })
    }
  }

  const handleFormCancel = () => {
    showModal.value = false
    btnCompanyType.value = false
    btnInfoType.value = false
    btnServiceType.value = false
    btnBrandType.value = false
    companyOne.value = {}
  }

  return {
    showModal,
    companyOne,
    handleFormSubmit,
    handleFormCancel
  }
}
