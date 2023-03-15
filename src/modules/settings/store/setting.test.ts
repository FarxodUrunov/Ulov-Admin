import { beforeEach, describe, it, expect } from 'vitest'
import { useSettingStore } from './setting'

import { setActivePinia, createPinia } from 'pinia'
describe('setting store', () => {
  let store: ReturnType<typeof useSettingStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSettingStore()
  })

  it('changes loading state', () => {
    expect(store.loading).toBe(false)
    store.loading = true
    expect(store.loading).toBe(true)
  })
})
