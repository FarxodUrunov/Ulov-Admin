import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationMessage from './NotificationMessage.vue'

const factory = (props?: Record<string, unknown>, slots?: { [key: string]: string }) => {
  return mount(NotificationMessage, {
    props: { id: 1, type: 'info', message: 'Test notification', ...props },
    slots
  })
}

describe('BaseNotification component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks type prop', () => {
    const wrapper = factory({ type: 'error' })
    expect(wrapper.find('[data-test="type-icon"]').classes()).toContain('bg-error/20')
  })

  it('checks message prop', () => {
    const message = 'This is test notification'
    const wrapper = factory({ message })
    expect(wrapper.find('[data-test="message"]').text()).toBe(message)
  })

  it('checks autoClose prop', () => {
    const wrapper = factory({ autoClose: false })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('checks slot', () => {
    const defaultSlot = 'This is default slot'
    const wrapper = factory({}, { default: defaultSlot })

    expect(wrapper.text()).toBe(defaultSlot)
  })
})
