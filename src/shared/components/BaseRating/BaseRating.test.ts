import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseRating from './BaseRating.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseRating, { props: { modelValue: 2, ...props } })
}

describe('BaseRating component', () => {
  it('renders as  expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks modelValue prop', () => {
    const value = 3
    const valueInPercent = (value * 100) / 5
    const wrapper = factory({ modelValue: value })

    expect(wrapper.find('[data-test="rating-selected"]').attributes().style).toContain(
      `${valueInPercent}%`
    )
  })

  it('checks size prop', () => {
    const wrapper = factory({ size: 'md' })

    expect(wrapper.find('[data-test="star-gray"]').classes()).toEqual(
      expect.arrayContaining(['w-6', 'h-6', 'mx-0.5'])
    )
    expect(wrapper.find('[data-test="star-yellow"]').classes()).toEqual(
      expect.arrayContaining(['w-6', 'h-6', 'mx-0.5'])
    )
  })

  it('has disabled prop', () => {
    const wrapper = factory({ modelValue: 3, disabled: true })

    expect(wrapper.find('[data-test="star-gray"]').classes()).toContain('pointer-events-none')
    expect(wrapper.find('[data-test="star-yellow"]').classes()).toContain('pointer-events-none')
  })

  it('clicks rating', async () => {
    const wrapper = factory()

    const secondStar = wrapper.findAll('[data-test="star-gray"]').at(1)!
    await secondStar.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
  })
})
