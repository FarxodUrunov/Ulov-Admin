import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseWorkDaysCheckbox from './BaseWorkDaysCheckbox.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseWorkDaysCheckbox, {
    props: {
      modelValue: false,
      title: 'Mon',
      ...props
    }
  })
}

describe('BaseWorkDaysCheckbox Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks title prop', () => {
    const wrapper = factory({ title: 'Wed' })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Wed')
  })

  it('emit an event when clicked', async () => {
    const wrapper = factory()

    await wrapper.find('[data-test="checkboxInput"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
