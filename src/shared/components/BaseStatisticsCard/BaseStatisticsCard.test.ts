import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseStatisticsCard from './BaseStatisticsCard.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseStatisticsCard, {
    props: {
      title: 'string',
      staticsNumber: 10522,
      staticsPercent: 42,
      growthDescendStatus: 'arrowGrowth',
      isActive: false,
      ...props
    }
  })
}

describe('BaseStatisticsCard Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })
  it('classes', () => {
    const wrapper = factory()

    expect(wrapper.find('h3').classes()).toContain('text-teal')
  })

  it('title prop', () => {
    const wrapper = factory({ title: 'Hello' })

    expect(wrapper.find('p').text()).toBe('Hello')
  })

  it('staticsNumber prop', () => {
    const wrapper = factory({ staticsNumber: 987456 })

    expect(wrapper.find('h2').text()).toBe('987 456')
  })

  it('staticsPercent prop', () => {
    const wrapper = factory({ staticsPercent: 63 })

    expect(wrapper.find('h3').text()).toBe('63%')
  })

  it('growthDescendStatus prop', () => {
    const wrapper = factory({ growthDescendStatus: 'arrowDescend' })

    expect(wrapper.find('h3').classes()).toContain('text-error')
  })

  it('isActive prop', () => {
    const wrapper = factory({ isActive: true })

    expect(wrapper.classes()).toContain('bg-blue-500')
  })
})
