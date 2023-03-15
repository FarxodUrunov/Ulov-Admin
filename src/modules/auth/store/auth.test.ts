import { beforeEach, describe, it, expect } from 'vitest'
import { useAuthStore } from './auth'

import { setActivePinia, createPinia } from 'pinia'
describe('auth store', () => {
  let store: ReturnType<typeof useAuthStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAuthStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
