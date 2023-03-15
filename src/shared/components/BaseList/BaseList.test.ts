import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseList from './BaseList.vue'
import type { DataSourceItem } from './types'

const dataSource: DataSourceItem[] = [
  {
    id: 'service_type',
    label: 'Service type',
    value: 'Service type'
  },
  {
    id: 'service_name',
    label: 'Service name',
    value: 'Service name'
  },
  {
    id: 'parts',
    label: 'Parts',
    value: 'Car parts'
  },
  {
    id: 'unit',
    label: 'Unit',
    value: '3 units'
  },
  {
    id: 'milleage_service',
    label: 'Milleage service',
    value: '100 000 km'
  },
  {
    id: 'mechanic',
    label: 'Mechanic',
    value: 'John Doe'
  },
  {
    id: 'price',
    label: 'Price',
    value: '620 000 sum'
  }
]

const factory = (slots?: { [key: string]: string }) => {
  return mount(BaseList, {
    props: { dataSource },
    slots
  })
}

describe('BaseList Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks dataSource prop: keys', () => {
    const wrapper = factory()
    const keys = wrapper.findAll('[data-test="key"]')

    expect(keys.map((el) => el.text()).length).toBe(14)
    expect(new Set(keys.map((el) => el.text())).size).toBe(7)
  })

  it('checks dataSource prop: values', () => {
    const wrapper = factory()
    const values = wrapper.findAll('[data-test="value"]')

    expect(values.map((el) => el.text()).length).toBe(14)
    expect(new Set(values.map((el) => el.text())).size).toBe(7)
  })
})
