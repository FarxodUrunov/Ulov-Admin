import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import SelectInput from './SelectInput.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(SelectInput, {
    props: {
      id: 'selectinput',
      name: 'selectinput',
      size: 'md',
      mode: '',
      message: '',
      modelValue: '',
      showArrow: false,
      open: true,
      showClose: false,
      ...props
    }
  })
}

describe('SelectInput', () => {
  it('Render properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('should render BaseInput mode', () => {
    const wrapper = factory()
    const component = wrapper.findComponent(BaseInput).exists()

    expect(component).toBe(true)
  })

  it('should render BaseFilterInput mode', async () => {
    const wrapper = factory({ mode: 'filter' })

    const component = wrapper.findComponent(BaseFilterInput).exists()

    expect(component).toBe(true)
  })

  it('errors props', () => {
    const wrapper = factory({ error: true })

    expect(wrapper.find('input').classes()).toContain('border-error')
  })

  it('success props', () => {
    const wrapper = factory({ success: true })

    expect(wrapper.find('input').classes()).toContain('border-success')
  })

  it('disabled props', () => {
    const wrapper = factory({ disabled: true })

    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('readonly props', () => {
    const wrapper = factory({ readonly: true })

    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('should emit input value', async () => {
    const wrapper = factory()

    await wrapper.find('input').setValue('search')

    expect(wrapper.emitted('update:modelValue')).toEqual([['search']])
  })

  it('should render with default value', () => {
    const wrapper = factory({ modelValue: 'Jack' })

    expect(wrapper.find('input').element.value).toBe('Jack')
  })
})
