import { beforeEach, describe, it, expect } from 'vitest'
import { useServiceStore } from './service'

import { setActivePinia, createPinia } from 'pinia'
describe('service store', () => {
  let store: ReturnType<typeof useServiceStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useServiceStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
