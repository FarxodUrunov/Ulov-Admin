import { defineStore } from 'pinia'
import { useFetchGet, useFetchPost, useFetchPatch, useFetchDelete } from '@/shared/api/fetch'
import { useNotificationStore } from '@/stores/notification'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: <Post[]>[],
    post: <Post | null>null,
    isLoading: false
  }),
  actions: {
    async fetchPosts() {
      this.isLoading = true
      const { data, statusCode } = await useFetchGet<Post[]>('/posts', { _limit: '30' })
      if (statusCode.value === 200 && data.value) {
        this.posts = data.value
      }
      this.isLoading = false
    },
    async createPost(payload: Omit<Post, 'id'>) {
      const notificationStore = useNotificationStore()
      this.isLoading = true
      const { statusCode } = await useFetchPost<typeof payload, { id: number }>('/posts', payload)
      if (statusCode.value === 201) {
        notificationStore.setNotification({
          type: 'success',
          message: 'Post created successfully'
        })
      }
      this.isLoading = false
    },
    async fetchPost(id: number) {
      this.isLoading = true
      const { data, statusCode } = await useFetchGet<Post>(`/posts/${id}`)
      if (statusCode.value === 200) {
        this.post = data.value
      }
      this.isLoading = false
    },
    async updatePost(id: number, payload: Partial<Omit<Post, 'id'>>) {
      const notificationStore = useNotificationStore()
      this.isLoading = true
      const { statusCode } = await useFetchPatch<typeof payload, { id: number }>(
        `/posts/${id}`,
        payload
      )
      if (statusCode.value === 200) {
        notificationStore.setNotification({
          type: 'success',
          message: 'Post updated successfully'
        })
      }
      this.isLoading = false
    },
    async deletePost(id: number) {
      const notificationStore = useNotificationStore()
      this.isLoading = true
      const { statusCode } = await useFetchDelete(`/posts/${id}`)
      if (statusCode.value === 200) {
        notificationStore.setNotification({
          type: 'success',
          message: 'Post deleted successfully'
        })
      }
      this.isLoading = false
    }
  }
})
