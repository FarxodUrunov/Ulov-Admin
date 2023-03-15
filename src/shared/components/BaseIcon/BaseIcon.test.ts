import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseIcon from './BaseIcon.vue'
describe('BaseIcon', () => {
  const wrapper = mount(BaseIcon, { props: { name: 'sort', class: 'w-10 h-10 text-red-400' } })
  it('renders properly', () => {
    expect(wrapper).toBeDefined()
  })
  it('has classes', () => {
    expect(wrapper.classes()).toContain('w-10')
    expect(wrapper.classes()).toContain('h-10')
  })
  it('has attributes', () => {
    expect(wrapper.attributes('fill')).toBe('currentColor')
    expect(wrapper.attributes('stroke')).toBe('none')
  })
})
