import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTextarea from './BaseTextarea.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseTextarea, {
    props: {
      modelValue: 'This is test comment',
      name: 'comment',
      placeholder: 'Comment',
      ...props
    }
  })
}

describe('BaseTextarea Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks textarea value change', async () => {
    const modelValue = 'This is updated comment'
    const wrapper = factory()
    const textarea = wrapper.find('textarea')

    await textarea.setValue(modelValue)

    expect(textarea.element.value).toBe(modelValue)
  })

  it('checks error state', () => {
    const errorMessage = 'This is error message'
    const wrapper = factory({ error: true, message: errorMessage })

    expect(wrapper.find('[data-test="message"]').text()).toBe(errorMessage)
    expect(wrapper.find('textarea').classes()).toEqual(
      expect.arrayContaining(['border-error', 'focus:border-error', 'focus:ring-error/30'])
    )
  })

  it('checks success state', () => {
    const errorMessage = 'This is success message'
    const wrapper = factory({ success: true, message: errorMessage })

    expect(wrapper.find('[data-test="message"]').text()).toBe(errorMessage)
    expect(wrapper.find('textarea').classes()).toEqual(
      expect.arrayContaining(['border-success', 'focus:border-success', 'focus:ring-success/30'])
    )
  })

  it('checks disabled state', () => {
    const wrapper = factory({ disabled: true })

    expect(wrapper.find('textarea').element.disabled).toBe(true)
  })

  it('checks rows prop', () => {
    const wrapper = factory({ rows: 3 })

    expect(wrapper.find('textarea').element.rows).toBe(3)
  })
})
