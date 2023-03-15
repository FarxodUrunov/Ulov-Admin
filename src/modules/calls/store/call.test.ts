import { beforeEach, describe, it, expect } from 'vitest'
import { useCallStore } from './call'

import { setActivePinia, createPinia } from 'pinia'
describe('call store', () => {
  let store: ReturnType<typeof useCallStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCallStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
