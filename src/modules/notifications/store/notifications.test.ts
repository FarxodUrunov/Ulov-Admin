import { beforeEach, describe, it, expect } from 'vitest'
import { useNotificationsStore } from './notifications'

import { setActivePinia, createPinia } from 'pinia'
describe('notifications store', () => {
  let store: ReturnType<typeof useNotificationsStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useNotificationsStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
