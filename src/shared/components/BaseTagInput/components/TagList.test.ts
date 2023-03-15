import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagList from './TagList.vue'

const items = [
  {
    active: true,
    tag: {
      id: 1,
      name: 'Wash'
    }
  },
  {
    active: true,
    tag: {
      id: 2,
      name: 'Clean'
    }
  },
  {
    active: true,
    tag: {
      id: 3,
      name: 'Change motor'
    }
  },
  {
    active: true,
    tag: {
      id: 4,
      name: 'Oil change'
    }
  },
  {
    active: true,
    tag: {
      id: 5,
      name: 'Dwigatel'
    }
  }
]

const factory = (props?: Record<string, unknown>) => {
  return mount(TagList, {
    props: {
      id: 'tagList',
      label: 'Choose tags or create',
      value: '',
      fieldNames: { key: 'id', label: 'name' },
      isFocused: true,
      items: [],
      width: 400,
      container: null,
      ...props
    }
  })
}

describe('TagList', () => {
  it('Render Properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('List searched tags', () => {
    const wrapper = factory({
      items,
      value: 'wash'
    })

    expect(wrapper.findAll('[data-test="list"]').length).toBe(5)
  })

  it('emit select', async () => {
    const wrapper = factory({
      items,
      value: 'wash'
    })
    await wrapper.findAll('[data-test="list"]')[2].trigger('click')

    expect(wrapper.emitted('select')).toEqual([[{ id: 3, name: 'Change motor' }]])
  })
})
