import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SingleSelect from './BaseSingleSelect.vue'
import SelectInput from './components/SelectInput.vue'
import SelectList from './components/SelectList.vue'

const items = [
  { id: 1, name: 'John ' },
  { id: 2, name: 'Doe' },
  { id: 3, name: 'Jack' },
  { id: 4, name: 'Maria' },
  { id: 5, name: 'Sofia' },
  { id: 6, name: 'Bebegim' },
  { id: 7, name: 'Nazli' },
  { id: 8, name: 'Elif' },
  { id: 9, name: 'Polat' }
]

const factory = (props?: Record<string, unknown>) => {
  return mount(SingleSelect, {
    props: {
      id: 'select',
      name: 'singleSelect',
      fieldNames: { key: 'id', label: 'name' },
      modelValue: '',
      label: 'Select',
      ...props
    }
  })
}

describe('SingleSelect', () => {
  it('Render properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('should have default notFoundContent', () => {
    const wrapper = factory()
    wrapper.find('input').trigger('click')
    expect(wrapper.find('[data-test="nodata"]').exists()).toBe(true)
  })

  it('should render option list when arrow clicked', async () => {
    const wrapper = factory({ options: items })

    await wrapper.find('[data-test="arrow"]').trigger('click')

    expect(wrapper.find('[data-test="list"]').exists()).toBe(true)

    await wrapper.find('[data-test="arrow"]').trigger('click')

    expect(wrapper.find('[data-test="list"]').isVisible()).toBe(false)
  })

  it('should render with default value', () => {
    const wrapper = factory({
      options: items,
      modelValue: 3
    })
    expect(wrapper.find('input').element.value).toBe('Jack')
  })

  it('should render SelectInput component', () => {
    const wrapper = factory()
    const component = wrapper.findComponent(SelectInput).exists()

    expect(component).toBe(true)
  })

  it('should render SelectList component', () => {
    const wrapper = factory()
    const component = wrapper.findComponent(SelectList).exists()

    expect(component).toBe(true)
  })

  it('should render selected element', () => {
    const wrapper = factory({
      options: items,
      modelValue: 4
    })

    expect(wrapper.find('input').element.value).toBe('Maria')
  })
})
