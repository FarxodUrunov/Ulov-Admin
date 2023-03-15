import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseMultiSelect from './BaseMultiSelect.vue'
import SelectList from './components/SelectList.vue'
import SelectInput from './components/SelectInput.vue'
import SelectedItems from './components/SelectedItems.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseMultiSelect, {
    props: {
      id: 'select',
      name: 'BaseMultiSelect',
      fieldNames: { key: 'id', label: 'name' },
      modelValue: [],
      label: 'Select',
      ...props
    }
  })
}

describe('BaseMultiSelect', () => {
  it('Render properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('should render SelectList component', () => {
    const wrapper = factory({
      mode: 'filter'
    })

    const component = wrapper.findComponent(SelectList).exists()

    expect(component).toBe(true)
  })

  it('should render SelectInput component', () => {
    const wrapper = factory()

    const component = wrapper.findComponent(SelectInput).exists()

    expect(component).toBe(true)
  })

  it('should render SelectItems component', () => {
    const wrapper = factory()

    const component = wrapper.findComponent(SelectedItems).exists()

    expect(component).toBe(true)
  })
})
