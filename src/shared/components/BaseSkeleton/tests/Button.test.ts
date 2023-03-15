import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SkeletonButton from '@/shared/components/BaseSkeleton/components/Button.vue'

const factory = (props?: Record<string, unknown>) =>
  mount(SkeletonButton, { props: { size: 'sm', ...props } })

describe('SkeletonButton Component', () => {
  it('renders property', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('check small size props', () => {
    const wrapper = factory({ size: 'sm' })

    expect(wrapper.find('[data-test="sm"]').classes()).toEqual(
      expect.arrayContaining(['w-28', 'h-9'])
    )
  })

  it('check medium size props', () => {
    const wrapper = factory({ size: 'md' })

    expect(wrapper.find('[data-test="md"]').classes()).toEqual(
      expect.arrayContaining(['w-36', 'h-10'])
    )
  })

  it('check large size props', () => {
    const wrapper = factory({ size: 'lg' })

    expect(wrapper.find('[data-test="lg"]').classes()).toEqual(
      expect.arrayContaining(['w-40', 'h-11'])
    )
  })

  it('check largeX size props', () => {
    const wrapper = factory({ size: 'xl' })

    expect(wrapper.find('[data-test="xl"]').classes()).toEqual(
      expect.arrayContaining(['w-44', 'h-12'])
    )
  })
})
