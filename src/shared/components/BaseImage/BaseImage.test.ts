import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseImage from './BaseImage.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseImage, { props })
}

describe('BaseImage Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks src prop', () => {
    const wrapper = factory({ src: '/imgNotFound.svg' })
    expect(wrapper.find('img').attributes('src')).toBe('/imgNotFound.svg')
  })

  it('checks alt prop', () => {
    const wrapper = factory({ alt: 'Image not found' })
    expect(wrapper.find('img').attributes('alt')).toBe('Image not found')
  })

  it('checks type prop', () => {
    const wrapper = factory({ type: 'user' })
    expect(wrapper.find('img').attributes('src')).toBe('/images/userNotFound.svg')
  })
})
