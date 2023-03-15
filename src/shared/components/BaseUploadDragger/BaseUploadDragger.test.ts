import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseUploadDragger from './BaseUploadDragger.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseUploadDragger, {
    props: {
      modelValue: null,
      accept: ['png', 'jpg', 'jpeg', 'webp'],
      description: 'Logo of your company',
      ...props
    },
    global: {
      stubs: {
        BaseIcon: true,
        BaseUpload: true
      }
    }
  })
}

describe('BaseUploadDragger Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks description prop', () => {
    const wrapper = factory({ description: 'Logo of your company' })
    expect(wrapper.find('[data-test="description"]').text()).toBe('Logo of your company')
  })

  it('checks accept prop', () => {
    const wrapper = factory({ accept: ['png', 'jpg', 'jpeg', 'webp'] })
    expect(wrapper.find('[data-test="fileInput-multiple"]').attributes('accept')).toBe(
      '.png,.jpg,.jpeg,.webp'
    )
  })
})
