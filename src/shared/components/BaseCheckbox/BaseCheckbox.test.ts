import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCheckbox from './BaseCheckbox.vue'

const factory = (
  modelValue: boolean = false,
  id: string = '',
  disabled: boolean = false,
  label: string = ''
) => {
  const options = {
    props: {
      modelValue,
      id,
      disabled,
      label
    }
  }
  return mount(BaseCheckbox, options)
}

describe('BaseCheckbox', () => {
  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('has classes', () => {
    const wrapper = factory()

    expect(wrapper.classes()).toContain('flex')
    expect(
      wrapper.find(
        '[class="w-5 h-5 rounded-md text-primary border-2 duration-200 border-dark-light focus:ring-primary focus:ring-2"]'
      )
    )
  })

  it('has props disabled', () => {
    const wrapper = factory(false, 'checkboxId', true, '')
    expect(wrapper.find('[class="w-5 h-5 rounded-md text-gray border-0"]'))
  })

  it('has props label', () => {
    const wrapper = factory(false, 'checkboxId', false, 'Hello world')
    expect(wrapper.text()).toContain('Hello world')
  })

  it('has props modelValue', () => {
    const wrapper = factory(true, 'checkboxId', false, '')
    expect(wrapper.find('input').element.checked).toBe(true)
  })
})
