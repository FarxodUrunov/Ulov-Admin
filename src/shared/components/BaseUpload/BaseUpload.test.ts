import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseUpload from './BaseUpload.vue'

const modelValue = {
  id: 121212,
  name: 'Test file',
  size: 54543543,
  path: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
}

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseUpload, {
    props: {
      modelValue: null,
      accept: ['png', 'jpg', 'jpeg', 'webp'],
      description: 'Logo of your company',
      ...props
    },
    global: {
      stubs: {
        BaseButton: true,
        BaseIcon: true,
        BaseUploadImage: true
      }
    }
  })
}

describe('BaseUpload Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks size prop', () => {
    const wrapper = factory({ size: 'lg' })

    expect(wrapper.find('[data-test="dropzone"]').classes()).toEqual(
      expect.arrayContaining(['w-80', 'h-44'])
    )
  })

  it('cheks title and description props', () => {
    const wrapper = factory({ title: 'Upload your logo', description: 'Logo of your company' })

    expect(wrapper.find('[data-test="title"]').attributes('title')).toBe('Upload your logo')
    expect(wrapper.find('[data-test="description"]').text()).toBe('Logo of your company')
  })

  it('checks accept prop', () => {
    const wrapper = factory({ accept: ['png', 'jpg', 'jpeg', 'webp'] })

    expect(wrapper.find('[data-test="file-input"]').attributes('accept')).toBe(
      '.png,.jpg,.jpeg,.webp'
    )
  })

  it('checks full prop', () => {
    const wrapper = factory({ full: true })

    expect(wrapper.find('[data-test="label-trigger"]').exists()).toBe(true)
  })

  it('checks modelValue prop', () => {
    const wrapper = factory({ modelValue })

    expect(wrapper.find('[data-test="upload-image"]').attributes('path')).toBe(modelValue.path)
  })
})
