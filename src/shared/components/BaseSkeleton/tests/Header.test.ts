import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SkeletonHeader from '@/shared/components/BaseSkeleton/SkeletonHeader.vue'

const factory = (props?: Record<string, unknown>) =>
  mount(SkeletonHeader, { props: { active: false, ...props } })

describe('SkeletonHeader Component', () => {
  it('renders property', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('check active props', () => {
    const wrapper = factory({ active: true })

    expect(
      wrapper.find('[data-test="header"]').findComponent('[data-test="circle"]').exists()
    ).toBe(true)

    expect(
      wrapper.find('[data-test="header"]').findComponent('[data-test="paragraph"]').exists()
    ).toBe(true)
  })
})
