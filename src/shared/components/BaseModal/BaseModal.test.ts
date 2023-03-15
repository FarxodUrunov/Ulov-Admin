import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from './BaseModal.vue'
import Dialogstub from './stubs/DialogStub.vue'

vi.stubGlobal(
  'IntersectionObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn()
  }))
)

const factory = (props?: Record<string, unknown>, slots?: Record<string, string>) => {
  return mount(BaseModal, {
    props: { modelValue: false, ...props },
    slots,
    global: {
      stubs: {
        BaseIcon: true,
        Dialog: Dialogstub,
        BaseButton: {
          template: `<button><slot /></button>`
        },
        DialogPanel: {
          template: `<div><slot /></div>`
        }
      }
    }
  })
}

describe('BaseModal Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks modelValue prop', () => {
    const wrapper = factory({ modelValue: false })
    expect(wrapper.isVisible()).toBe(false)
  })

  it('checks size prop', () => {
    const wrapper = factory({ modelValue: true, size: 'md' })
    expect(wrapper.find('[data-test="dialog-panel"]').classes()).toEqual(
      expect.arrayContaining(['max-w-md', 'sm:max-w-lg', 'md:max-w-xl'])
    )
  })

  it('checks title props', () => {
    const title = 'Test Title'
    const wrapper = factory({
      modelValue: true,
      headerText: title,
      cancelText: title,
      confirmText: title
    })

    expect(wrapper.find('[data-test="dialog-header"]').text()).toBe(title)
    expect(wrapper.find('[data-test="cancel-button"]').text()).toBe(title)
    expect(wrapper.find('[data-test="confirm-button"]').text()).toBe(title)
  })

  it('checks hidden header and footer props', () => {
    const wrapper = factory({ modelValue: true, hideHeader: true, hideFooter: true })

    expect(wrapper.find('[data-test="dialog-body"]').classes()).toEqual(
      expect.arrayContaining(['pt-4', 'pb-4'])
    )
    expect(wrapper.find('[data-test="dialog-header"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="dialog-footer"]').exists()).toBe(false)
  })

  it('checks hideCloseButton prop', () => {
    const wrapper = factory({ modelValue: true, hideCloseButton: true })

    expect(wrapper.find('[data-test="dialog-close-button"]').exists()).toBe(false)
  })

  it('checks cancel and confirm emits', () => {
    const wrapper = factory({ modelValue: true })

    wrapper.find('[data-test="cancel-button"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('cancel')

    wrapper.find('[data-test="confirm-button"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('confirm')
  })
})
