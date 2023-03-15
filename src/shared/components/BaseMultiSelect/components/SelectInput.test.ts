import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectInput from './SelectInput.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(SelectInput, {
    props: {
      id: 'selectinput',
      name: 'SelectInput',
      size: 'md',
      mode: '',
      message: '',
      error: false,
      success: false,
      disabled: false,
      loading: false,
      modelValue: '',
      showArrow: false,
      open: false,
      showClose: false,
      label: 'name',
      ...props
    }
  })
}

describe('BaseMultiSelect', () => {
  it('Render properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
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

  it('should render BaseInput mode', () => {
    const wrapper = factory()

    const component = wrapper.findComponent(BaseInput).exists()

    expect(component).toBe(true)
  })

  it('should render BaseFilterInput for filter mode', () => {
    const wrapper = factory({
      mode: 'filter'
    })

    const component = wrapper.findComponent(BaseFilterInput).exists()

    expect(component).toBe(true)
  })
})
