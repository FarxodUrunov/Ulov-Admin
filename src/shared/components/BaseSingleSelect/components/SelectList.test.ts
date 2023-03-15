import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectList from './SelectList.vue'

const items = [
  { active: false, option: { id: 1, name: 'John ' } },
  { active: false, option: { id: 2, name: 'Doe' } },
  { active: false, option: { id: 3, name: 'Jack' } }
]

const factory = (props?: Record<string, unknown>) => {
  return mount(SelectList, {
    props: {
      id: 'select',
      open: true,
      search: false,
      modelValue: '',
      searchPlaceHolder: 'Search',
      label: 'name',
      items: [],
      width: 500,
      container: null,
      ...props
    }
  })
}

describe('SelectList', () => {
  it('Render properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('should have default notFoundContent', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="nodata"]').exists()).toBe(true)
  })

  it('should render option list', async () => {
    const wrapper = factory({ items: items })

    expect(wrapper.find('[data-test="list"]').exists()).toBe(true)
  })

  it('should be searchable', () => {
    const wrapper = factory({
      items: items,
      search: true
    })

    expect(wrapper.find('#search-select').exists()).toBe(true)
  })
})
