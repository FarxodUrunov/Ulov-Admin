import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheTableHeaderFilters from './TheTableHeaderFilters.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TheTableHeaderFilters, { props })
}

const propFilter = [
  { id: 1, name: 'Jack', key: 'name' },
  { id: 2, name: 'UserId', key: 'id' },
  { id: 3, name: 'Text', key: 'body' }
]

describe('TheTableHeaderFilters component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks appliedFilters prop', () => {
    const wrapper = factory({ appliedFilters: propFilter })

    expect(wrapper.findAll('[data-test="filter-name"]')[0].text()).toBe('Jack')
    expect(wrapper.findAll('[data-test="filter-name"]')[1].text()).toBe('UserId')
    expect(wrapper.findAll('[data-test="filter-name"]')[2].text()).toBe('Text')
  })

  it('checks emitted: applyFilters', () => {
    const wrapper = factory({ appliedFilters: propFilter })

    wrapper.findAll('[data-test="apply-filters"]')[0].trigger('click')
    const deleteEvent = wrapper.emitted('applyFilters')

    expect(deleteEvent).toHaveLength(1)
    expect(wrapper.emitted()).toHaveProperty('applyFilters')
  })

  it('checks emitted: deleteFilter', () => {
    const wrapper = factory({ appliedFilters: propFilter })

    wrapper.findAll('[data-test="delete-filter"]')[0].trigger('click')
    const deleteEvent = wrapper.emitted('deleteFilter')

    expect(deleteEvent).toHaveLength(1)
    expect(wrapper.emitted()).toHaveProperty('deleteFilter')
  })

  it('checks emitted: resetFilters', () => {
    const wrapper = factory({ appliedFilters: propFilter })

    wrapper.findAll('[data-test="reset-filters"]')[0].trigger('click')
    const deleteEvent = wrapper.emitted('resetFilters')

    expect(deleteEvent).toHaveLength(1)
    expect(wrapper.emitted()).toHaveProperty('resetFilters')
  })
})
