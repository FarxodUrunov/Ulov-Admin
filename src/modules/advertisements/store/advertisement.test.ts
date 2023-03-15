import { beforeEach, describe, it, expect } from 'vitest'
import { useAdvertisementStore } from './advertisement'

import { setActivePinia, createPinia } from 'pinia'
describe('adversitement store', () => {
  let store: ReturnType<typeof useAdvertisementStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useAdvertisementStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
