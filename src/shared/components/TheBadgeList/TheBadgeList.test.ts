import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheBadgeList from './TheBadgeList.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TheBadgeList, {
    props: { items: ['hello', 'world'], ...props }
  })
}

describe('TheBadgeList', () => {
  it('renders properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('has props', () => {
    const wrapper = factory({ items: ['Propan', 'Metan'] })

    expect(wrapper.findAll('[data-test="items-title"]')[0].text()).toContain('Propan')
    expect(wrapper.findAll('[data-test="items-title"]')[1].text()).toContain('Metan')
    expect(wrapper.findAll('[data-test="items-title"]').length).toBe(2)
  })
})
