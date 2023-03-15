import { defineStore } from 'pinia'

export const useAdvertisementStore = defineStore('advertisement', {
  state: () => ({
    loading: false
  })
})
