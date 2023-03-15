import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheTableHeader from './TheTableHeader.vue'

const factory = (
  props?: Record<string, unknown>,
  slots: { [key: string]: string } = { default: 'Button' }
) => {
  return mount(TheTableHeader, {
    props: { search: '', sort: '', ...props },
    slots
  })
}

describe('TheTableHeaderFilters component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks click', async () => {
    const wrapper = factory()

    await wrapper.find('[data-test="filter-button"]').trigger('click')

    expect(wrapper.find('[data-test="filters-section"]').classes()).toContain('rounded-lg')
  })

  it('checks default slot', async () => {
    const slotText = 'Checking default slot'
    const wrapper = factory({ search: 'Hello' }, { default: slotText })

    await wrapper.find('[data-test="filter-button"]').trigger('click')
    const inputValue = wrapper.find('input')

    expect(wrapper.find('[data-test="slot"]').text()).toBe(slotText)
    expect(inputValue.element.value).toBe('Hello')
  })

  it('checks modelValue prop', async () => {
    const wrapper = factory({ search: 'Hello' })

    const inputValue = wrapper.find('input')

    expect(inputValue.element.value).toBe('Hello')
  })
})
