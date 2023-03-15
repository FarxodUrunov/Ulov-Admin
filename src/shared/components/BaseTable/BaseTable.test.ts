import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { reactive, toRefs, nextTick } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import BaseTable from './BaseTable.vue'
import { useBaseTable } from './composables/useBaseTable'
import type { ColumnType } from './types'

const dataSource: any = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    job: 'Software engineer',
    interest: 'Writing clean and maintanable code',
    city: 'Alat in Bikhara in Uzbekistan',
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    job: 'Software engineer',
    interest: 'Writing clean and maintanable code',
    city: 'Alat in Bikhara in Uzbekistan',
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    job: 'Software engineer',
    interest: 'Writing clean and maintanable code',
    city: 'Alat in Bikhara in Uzbekistan',
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
]

const columns: ColumnType[] = [
  { title: 'ID', dataIndex: 'key', key: 'key' },
  { title: 'Name', dataIndex: 'name', key: 'name', sort: true },
  { title: 'Age', dataIndex: 'age', key: 'age' }
]

const factory = (
  props?: Record<string, unknown>,
  slots?: { [key: string]: string } | undefined
) => {
  return mount(BaseTable, {
    props: {
      name: 'table',
      dataSource,
      trackKey: 'key',
      columns,
      ...props
    },
    slots
  })
}

const composable = (params?: any) => {
  const wrapper = factory(params)
  const props = reactive({ name: 'table', dataSource, trackKey: 'key', columns })
  const table = useBaseTable(toRefs(props), wrapper.getCurrentComponent().emit)
  return { ...table, wrapper }
}

describe('BaseTable component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Render Properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('Table loading', () => {
    const wrapper = factory({ loading: true })

    expect(wrapper.find('[data-test="table-loading"]').exists()).toBe(true)
  })

  it('Table selectable', async () => {
    const wrapper = factory({ selectable: true })

    expect(wrapper.find('[data-test="table-head-select"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="table-body-select"]').exists()).toBe(true)
  })

  it('Table action', async () => {
    const wrapper = factory({ action: { edit: true, delete: true, duplicate: true } })

    expect(wrapper.find('[data-test="table-head-action"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="table-body-action"]').exists()).toBe(true)
    expect(wrapper.findAll('[data-test="table-body-action"]').length).toBe(3)
  })

  it('Table No Data', () => {
    const wrapper = factory({ dataSource: [] })

    expect(wrapper.find('[data-test="nodata"]').exists()).toBe(true)
  })

  it('Table pagination', () => {
    const wrapper = factory({ pagination: true })

    expect(wrapper.find('[data-test="table-pagination"]').exists()).toBe(true)
  })

  it('Table row render properly', () => {
    const wrapper = factory()

    expect(wrapper.findAll('[data-test="table-row"]').length).toBe(3)
  })

  it('Table row click emit', async () => {
    const wrapper = factory()

    await wrapper.findAll('[data-test="table-row"]')[0].trigger('click')

    expect(wrapper.findAll('[data-test="table-row"]').length).toBe(3)
    expect(wrapper.emitted('rowclick')).toEqual([[dataSource[0]]])
  })

  it('Emit selected', async () => {
    const { selectedIds, wrapper } = composable({ selectable: true })

    selectedIds.value = new Set([1, 2, 3])

    await nextTick()
    expect(wrapper.emitted('select')).toEqual([[[]], [[]], [[1, 2, 3]]])
  })

  it('Emit delete selecteds', async () => {
    const { selectedIds, handleDelete, wrapper } = composable({ selectable: true })
    selectedIds.value = new Set([1, 2])

    await handleDelete()

    expect(wrapper.emitted('delete')).toEqual([[]])
  })

  it('Emit actions', async () => {
    const { handleAction, wrapper } = composable()

    await handleAction('edit', dataSource[1])

    expect(wrapper.emitted('action')).toEqual([
      [
        {
          action: 'edit',
          data: dataSource[1]
        }
      ]
    ])
  })

  it('Emit columns', async () => {
    const { handleColumnSelect, wrapper } = composable()

    await handleColumnSelect(columns)

    expect(wrapper.emitted('columns')).toEqual([[['key', 'name', 'age']], [['key', 'name', 'age']]])
  })

  it('Emit sort asc, desc and cancel', async () => {
    const wrapper = factory()

    await wrapper.find('[data-test="table-sort-name"]').trigger('click')
    expect(wrapper.emitted('sort')).toEqual([[{ sort: 'asc', column: 'name' }]])

    await wrapper.find('[data-test="table-sort-name"]').trigger('click')
    expect(wrapper.emitted('sort')).toEqual([
      [{ sort: 'asc', column: 'name' }],
      [{ sort: 'desc', column: 'name' }]
    ])

    await wrapper.find('[data-test="table-sort-name"]').trigger('click')
    expect(wrapper.emitted('sort')).toEqual([
      [{ sort: 'asc', column: 'name' }],
      [{ sort: 'desc', column: 'name' }],
      [{ sort: 'cancel', column: 'name' }]
    ])
  })

  it('Row-column slot', () => {
    const wrapper = factory(
      {},
      {
        'cell(name)': `<template #cell(name)=params>I am the table</template>`
      }
    )

    expect(wrapper.html()).toContain('I am the table')
  })
})
