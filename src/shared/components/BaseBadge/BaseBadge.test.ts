import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseBadge from './BaseBadge.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseBadge, {
    props
  })
}

describe('BaseBadge', () => {
  it('renders properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('has props', () => {
    const wrapper = factory({ text: 'Замена масло фильтра' })

    expect(wrapper.find('div').text()).toBe('Замена масло фильтра')
  })

  it('has classes', () => {
    const wrapper = factory({ variant: 'error' })

    expect(wrapper.classes()).toContain('text-white')
    expect(wrapper.classes()).toContain('bg-error')
  })
})
