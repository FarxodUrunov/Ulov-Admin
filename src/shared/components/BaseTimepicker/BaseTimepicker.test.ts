import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseTimepicker from './BaseTimepicker.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseTimepicker, { props: { id: 'from', name: 'from', label: 'From', ...props } })
}

describe('BaseTimepicker component', () => {
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })
})
