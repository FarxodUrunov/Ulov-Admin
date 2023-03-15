import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectList from './SelectList.vue'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'

const items = [
  { active: false, option: { id: 1, name: 'John ' } },
  { active: false, option: { id: 2, name: 'Doe' } },
  { active: false, option: { id: 3, name: 'Jack' } },
  { active: false, option: { id: 4, name: 'Maria' } },
  { active: false, option: { id: 5, name: 'Sofia' } },
  { active: false, option: { id: 6, name: 'Bebegim' } },
  { active: false, option: { id: 7, name: 'Nazli' } },
  { active: false, option: { id: 8, name: 'Elif' } },
  { active: false, option: { id: 9, name: 'Polat' } }
]

const factory = (props?: Record<string, unknown>) => {
  return mount(SelectList, {
    props: {
      id: 'select',
      name: 'name',
      open: true,
      search: false,
      searchLoading: false,
      isSelectAll: false,
      modelValue: '',
      items,
      searchPlaceHolder: 'Select something',
      label: 'name',
      indeterminate: false,
      width: 500,
      container: null,
      ...props
    }
  })
}

describe('SelectList', () => {
  it('render items', () => {
    const wrapper = factory()

    const items = wrapper.findAll('li')

    expect(items.length).toBe(10)
  })

  it('emit selected elements', async () => {
    const wrapper = factory()

    await wrapper.find('[data-test="3"]').trigger('click')

    await wrapper.find('[data-test="5"]').trigger('click')

    const events: any = wrapper.emitted('select')

    expect(events).toEqual([[{ id: 4, name: 'Maria' }], [{ id: 6, name: 'Bebegim' }]])
  })

  it('should have default notFoundContent', () => {
    const wrapper = factory({ items: [] })

    expect(wrapper.find('[data-test="nodata"]').exists()).toBe(true)
  })

  it('should render Search input', () => {
    const wrapper = factory({
      search: true
    })

    const component = wrapper.findComponent(BaseFilterInput).exists()

    expect(component).toBe(true)
  })
})
