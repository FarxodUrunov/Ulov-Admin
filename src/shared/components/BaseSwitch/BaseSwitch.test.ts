import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSwitch from './BaseSwitch.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseSwitch, {
    props: {
      modelValue: false,
      ...props
    }
  })
}

describe('BaseSwitch component', () => {
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks prop modelValue: false', () => {
    const wrapper = factory({ modelValue: false })
    expect(wrapper.find('[aria-checked="false"]').exists()).toBe(true)
  })

  it('checks prop modelValue: true', () => {
    const wrapper = factory({ modelValue: true })

    expect(wrapper.find('[aria-checked="true"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="false"]').exists()).toBe(true)
  })

  it('checks prop disabled', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.find('[data-test="switch"]').classes()).toContain('pointer-events-none')
  })

  it('checks prop label', () => {
    const wrapper = factory({ label: 'Test label' })
    expect(wrapper.find('[data-test="label"]').text()).toBe('Test label')
  })
})
