import { createFetch } from '@vueuse/core'
import { getItem } from '@/shared/utils/local_storage'

const useFetch = createFetch({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  options: {
    afterFetch: (ctx) => {
      // TODO: Handle errors
      return ctx
    },
    beforeFetch({ options }) {
      const isAuthorization = getItem('Authorization')
      options.headers = {
        ...options.headers,
        'x-access-type': '2567a5ec9705eb7ac2c984033e06189d',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${isAuthorization || ''}`
      }
    }
  }
})

export const useFetchGet = async <
  T,
  P extends string[][] | Record<string, string> | string | URLSearchParams = {}
>(
  url: string,
  params?: P
) => {
  return useFetch(url + '?' + new URLSearchParams(params), { method: 'GET' }).json<T>()
}

export const useFetchPost = async <D, T>(url: string, data: D) => {
  return useFetch(url, { method: 'POST', body: JSON.stringify(data) }).json<T>()
}

export const useFetchPatch = async <D, T>(url: string, data: D) => {
  return useFetch(url, { method: 'PATCH', body: JSON.stringify(data) }).json<T>()
}

export const useFetchDelete = async <T>(url: string) => {
  return useFetch(url, { method: 'DELETE' }).json<T>()
}
