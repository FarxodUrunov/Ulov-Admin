import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTagInput from './BaseTagInput.vue'
import TagInput from './components/TagInput.vue'
import TagList from './components/TagList.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseTagInput, {
    props: {
      id: 'taginput',
      name: 'basetaginput',
      label: 'Choose tags or create',
      modelValue: [],
      searchTags: [],
      fieldNames: { key: 'id', label: 'name' },
      ...props
    }
  })
}

describe('BaseTagInput', () => {
  it('Render Properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('should render TagList component', () => {
    const wrapper = factory()
    const component = wrapper.findComponent(TagList)

    expect(component.exists()).toBe(true)
  })

  it('should render TagInput component', () => {
    const wrapper = factory()
    const component = wrapper.findComponent(TagInput)

    expect(component.exists()).toBe(true)
  })
})
