import { beforeEach, describe, it, expect } from 'vitest'
import { useCompanyStore } from './company'

import { setActivePinia, createPinia } from 'pinia'
describe('company store', () => {
  let store: ReturnType<typeof useCompanyStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCompanyStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
