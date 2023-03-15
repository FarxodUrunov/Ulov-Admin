import { defineStore } from 'pinia'
import { useFetchGet, useFetchPost, useFetchDelete, useFetchPatch } from '@/shared/api/fetch'
import { useNotificationStore } from '@/stores/notification'
import type { CompanyDataAll, CreateCompany } from './types'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companiesAllData: <CompanyDataAll[]>[],
    towTruckAllData: <CompanyDataAll[]>[],
    fuelAllData: <CompanyDataAll[]>[],
    carWashAllData: <CompanyDataAll[]>[],
    companyOne: <any>{},
    loading: false,
    btnCompanyType: false,
    btnInfoType: false,
    btnServiceType: false,
    btnBrandType: false,
    createCompanyData: <CreateCompany>{},
    createdInfoData: <any>{},
    createdServiceData: <any>{},
    createdBrandsData: <any>{}
  }),
  actions: {
    async fetchCompaniesAll() {
      this.loading = true
      const { data, statusCode } = await useFetchGet<CompanyDataAll[]>('branches/auto_service')
      if (statusCode.value === 200 && data.value) {
        this.companiesAllData = data.value
        this.loading = false
      }
    },
    async fetchTowTruckAll() {
      this.loading = true
      const { data, statusCode } = await useFetchGet<CompanyDataAll[]>('branches/tow_truck')
      if (statusCode.value === 200 && data.value) {
        this.towTruckAllData = data.value
        this.loading = false
      }
    },
    async fetchFuelAll() {
      this.loading = true
      const { data, statusCode } = await useFetchGet<CompanyDataAll[]>('branches/auto_refueling')
      if (statusCode.value === 200 && data.value) {
        this.fuelAllData = data.value
        this.loading = false
      }
    },
    async fetchCarWashAll() {
      this.loading = true
      const { data, statusCode } = await useFetchGet<CompanyDataAll[]>('branches/carwash')
      if (statusCode.value === 200 && data.value) {
        this.carWashAllData = data.value
        this.loading = false
      }
    },
    async fetchCompanyOne(id: number) {
      this.loading = true
      const { data, statusCode } = await useFetchGet<any>(`branches/auto_service/${id}`)
      if (statusCode.value === 200 && data.value) {
        this.companyOne = data.value
        this.loading = false
      }
    },
    async createCompany(url: string, payload: any) {
      const notificationStore = useNotificationStore()
      this.loading = true
      const { statusCode, error } = await useFetchPost<string, any>(`branches/${url}`, payload)
      this.loading = false
      if (statusCode.value === 201) {
        notificationStore.setNotification({
          type: 'success',
          message: 'Created successfully'
        })
        this.btnCompanyType = false
        this.btnInfoType = false
        this.btnServiceType = false
        this.btnBrandType = false
      } else {
        notificationStore.setNotification({
          type: 'error',
          message: error.value
        })
      }
      return statusCode
    },
    async deleteCompany(id: number) {
      const notificationStore = useNotificationStore()
      this.loading = true
      const { statusCode, error } = await useFetchDelete(`branches/auto_service/${id}`)
      if (statusCode.value === 200) {
        this.loading = false
        notificationStore.setNotification({
          type: 'success',
          message: 'Delete successfully'
        })
      } else {
        notificationStore.setNotification({
          type: 'error',
          message: error.value
        })
      }
      return statusCode
    },
    async editCompany(id: number, payload: any) {
      const notificationStore = useNotificationStore()
      this.loading = true
      const { statusCode, error } = await useFetchPatch(`branches/auto_service/${id}`, payload)
      if (statusCode.value === 200) {
        this.loading = false
        this.companyOne = {}
        notificationStore.setNotification({
          type: 'success',
          message: 'Edit successfully'
        })
      } else {
        notificationStore.setNotification({
          type: 'error',
          message: error.value
        })
      }
      return statusCode
    }
  }
})
