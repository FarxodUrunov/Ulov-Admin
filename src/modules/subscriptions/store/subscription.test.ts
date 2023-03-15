import { beforeEach, describe, it, expect } from 'vitest'
import { useSubscriptionStore } from './subscription'

import { setActivePinia, createPinia } from 'pinia'
describe('subscription store', () => {
  let store: ReturnType<typeof useSubscriptionStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSubscriptionStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
