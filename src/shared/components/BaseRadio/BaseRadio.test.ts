import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseRadio from './BaseRadio.vue'

const factory = (props?: Record<string, unknown>) =>
  mount(BaseRadio, { props: { value: 'Основной', modelValue: 'Основной', ...props } })

describe('BaseRadio Component', () => {
  it('renders property', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks size prop', () => {
    const wrapper = factory({ size: 'md' })
    expect(wrapper.classes()).toContain('inline-flex')
  })

  it('checks error prop', () => {
    const wrapper = factory({ error: true })
    expect(wrapper.classes()).toContain('border-error')
  })

  it('checks disabled prop', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.classes()).toContain('cursor-not-allowed')
  })

  it('checks label prop', () => {
    const wrapper = factory({ label: 'Label' })
    expect(wrapper.find('span').text()).toBe('Label')
  })

  it('checks value and modelValue prop', () => {
    const wrapper = factory()
    expect(wrapper.exists()).toBe(true)
  })
})
