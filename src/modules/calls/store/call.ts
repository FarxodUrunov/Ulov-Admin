import { defineStore } from 'pinia'

export const useCallStore = defineStore('call', {
  state: () => ({
    loading: false
  })
})
