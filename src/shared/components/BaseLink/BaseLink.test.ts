import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseLink from './BaseLink.vue'

const factory = (props: { [key: string]: unknown } = {}) => {
  return mount(BaseLink, {
    props: { to: 'https://github.com', ...props },
    global: {
      stubs: ['router-link']
    }
  })
}

describe('BaseLink Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('checks default variant', () => {
    const wrapper = factory()
    expect(wrapper.find('a').classes()).toContain('bg-primary')
  })

  it('checks variant', () => {
    const wrapper = factory({ variant: 'error' })
    expect(wrapper.find('a').classes()).toContain('bg-error')
  })

  it('checks variant and outlined props', () => {
    const wrapper = factory({ variant: 'error', outlined: true })
    expect(wrapper.find('a').classes()).toContain('bg-white')
  })

  it('checks router-link', () => {
    const wrapper = factory({ to: '/auth/login' })
    expect(wrapper.find('router-link-stub').exists()).toBe(true)
  })
})
