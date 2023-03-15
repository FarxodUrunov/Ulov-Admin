import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SkeletonCircle from '@/shared/components/BaseSkeleton/components/Circle.vue'

const factory = (props?: Record<string, unknown>) => mount(SkeletonCircle, { props: { ...props } })

describe('SkeletonCircle Component', () => {
  it('renders property', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('check shape circle props', () => {
    const wrapper = factory({ shape: 'circle' })

    expect(wrapper.find('[data-test="circle"]').classes('rounded-full')).toBe(true)
  })

  it('check shape square props', () => {
    const wrapper = factory({ shape: 'square' })

    expect(wrapper.find('[data-test="circle"]').classes('rounded-md')).toBe(true)
  })

  it('check small size props', () => {
    const wrapper = factory({ size: 'sm' })

    expect(wrapper.find('[data-test="circle"]').classes()).toEqual(
      expect.arrayContaining(['w-5', 'h-5'])
    )
  })

  it('check medium size props', () => {
    const wrapper = factory({ size: 'md' })

    expect(wrapper.find('[data-test="circle"]').classes()).toEqual(
      expect.arrayContaining(['w-6', 'h-6'])
    )
  })

  it('check large size props', () => {
    const wrapper = factory({ size: 'lg' })

    expect(wrapper.find('[data-test="circle"]').classes()).toEqual(
      expect.arrayContaining(['w-10', 'h-10'])
    )
  })

  it('check largeX size props', () => {
    const wrapper = factory({ size: 'xl' })

    expect(wrapper.find('[data-test="circle"]').classes()).toEqual(
      expect.arrayContaining(['w-24', 'h-24'])
    )
  })
})
