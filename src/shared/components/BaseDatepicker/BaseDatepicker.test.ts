import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseDatepicker from './BaseDatepicker.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseDatepicker, {
    props: {
      modelValue: '2022-11-11',
      id: 'dob',
      name: 'dob',
      label: 'Date of birth',
      ...props
    }
  })
}

describe('BaseDatepicker component', () => {
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })
})
