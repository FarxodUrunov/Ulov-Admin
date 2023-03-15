import { defineStore } from 'pinia'
import { useFetchGet } from '@/shared/api/fetch'
import type { CarBrands, ServicesTags, Models } from './types'

export const useIinformationOfCompany = defineStore('information-data', {
  state: () => ({
    loading: false,
    brands: <CarBrands[]>[],
    services: <ServicesTags[]>[],
    companyName: <Models[] | null>[]
  }),
  actions: {
    async fetchCarBrandsAll() {
      const { data, statusCode } = await useFetchGet<CarBrands[]>('car-brands')
      if (statusCode.value === 200 && data.value) {
        this.brands = data.value
      }
    },
    async fetchServicesTagAll() {
      const { data, statusCode } = await useFetchGet<any>('tag-groups')
      if (statusCode.value === 200) {
        this.services = data.value
      }
    },
    async fetchCompanyAll() {
      const { data, statusCode } = await useFetchGet<Models[]>('companies')
      if (statusCode.value === 200) {
        this.companyName = data.value
      }
    }
  }
})
