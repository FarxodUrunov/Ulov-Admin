import { defineStore } from 'pinia'
import { useFetchPost } from '@/shared/api/fetch'
import { setItem } from '@/shared/utils/local_storage'
import { useNotificationStore } from '@/stores/notification'

interface PostLogin {
  access_token: string
}
interface PayloadLogin {
  phone: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false
  }),
  actions: {
    async login(payload: PayloadLogin) {
      const notificationStore = useNotificationStore()
      this.loading = true
      const { data, statusCode, error, isFetching } = await useFetchPost<typeof payload, PostLogin>(
        '/auth/login',
        payload
      )
      if (statusCode.value === 201) {
        setItem('Authorization', data.value?.access_token)
        notificationStore.setNotification({
          type: 'success',
          message: 'You logged in successfully'
        })
      } else {
        notificationStore.setNotification({
          type: 'error',
          message: error.value
        })
      }
      this.loading = isFetching.value
      return statusCode.value
    },
    logout() {
      localStorage.clear()
      window.location.reload()
    }
  }
})
