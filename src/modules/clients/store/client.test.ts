import { beforeEach, describe, it, expect } from 'vitest'
import { useClientStore } from './client'

import { setActivePinia, createPinia } from 'pinia'
describe('client store', () => {
  let store: ReturnType<typeof useClientStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useClientStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
