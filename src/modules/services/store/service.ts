import { defineStore } from 'pinia'
import { useFetchGet } from '@/shared/api/fetch'
// import { useNotificationStore } from '@/stores/notification'
import type { ServiceData } from '../types'

export const useServiceStore = defineStore('service', {
  state: () => ({
    loading: false,
    serviceData: <ServiceData[]>[],
    serviceOneData: {}
  }),
  actions: {
    async fetchServiceAll() {
      this.loading = true
      const { data, statusCode, isFetching } = await useFetchGet<ServiceData[]>('service-cards')
      // console.log(data.value, error.value)
      if (statusCode.value === 200 && data.value) {
        this.serviceData = data.value
        this.loading = isFetching.value
      }
    }
    // async fetchServiceOne(id:number){
    //   this.loading = true
    //   const { data, statusCode, isFetching, error } = await useFetchGet('service-cards'+`/${id}`)
    // }
  }
})
