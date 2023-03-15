import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagInput from './TagInput.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TagInput, {
    props: {
      id: 'taginput',
      name: 'basetaginput',
      label: 'Choose tags or create',
      modelValue: '',
      keyValue: 'name',
      isFocused: true,
      tagValues: [],
      ...props
    }
  })
}

describe('BaseTagInput', () => {
  it('Render Properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('label prop', () => {
    const wrapper = factory()

    expect(wrapper.find('label').text()).toBe('Choose tags or create')
  })

  it('errors props', () => {
    const wrapper = factory({ error: true })

    expect(wrapper.find('[data-test="border"]').classes()).toContain('border-error')
  })

  it('success props', () => {
    const wrapper = factory({ success: true })

    expect(wrapper.find('[data-test="border"]').classes()).toContain('border-success')
  })

  it('disabled props', () => {
    const wrapper = factory({ disabled: true })

    expect(wrapper.find('[data-test="disable"]').classes()).toContain('cursor-not-allowed')
  })

  it('readonly props', () => {
    const wrapper = factory({ readonly: true })

    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('renders default tag values', () => {
    const wrapper = factory({
      tagValues: [{ id: 3, name: 'Change motor' }]
    })

    expect(wrapper.find('[data-test="list"]').text()).toContain('Change motor')
  })

  it('emit select', async () => {
    const wrapper = factory({
      tagValues: [
        { id: 3, name: 'Change motor' },
        { id: 6, name: 'Porshen' }
      ]
    })

    await wrapper.find('[data-test="0"]').trigger('click')

    expect(wrapper.emitted('select')).toEqual([[{ id: 3, name: 'Change motor' }]])
  })

  it('emit modelValue for search ', async () => {
    const wrapper = factory()

    await wrapper.find('input').setValue('search')

    expect(wrapper.emitted('update:modelValue')).toEqual([['search']])
  })
})
