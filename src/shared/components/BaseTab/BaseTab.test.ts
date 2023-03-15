import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTab from './BaseTab.vue'

const tabs = ['Tab 1', 'Tab 2', 'Tab 3']

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ name: 'home', path: '/' })),
  useRouter: () => ({
    resolve: vi.fn()
  })
}))

const factory = () => {
  return mount(BaseTab, { props: { tabs } })
}

describe('BaseTab component', () => {
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks tab items length', () => {
    const wrapper = factory()

    expect(wrapper.findAll('[role="tab"]')).toHaveLength(tabs.length)
    expect(wrapper.find('[role="tab"][data-test="tab-2"]').exists()).toBe(true)
  })
})
