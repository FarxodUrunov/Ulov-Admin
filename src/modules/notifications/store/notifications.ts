import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    loading: false
  })
})
