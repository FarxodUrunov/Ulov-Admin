import { defineStore } from 'pinia'

export const useClientStore = defineStore('client', {
  state: () => ({
    loading: false
  })
})
