import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SkeletonSidebar from '@/shared/components/BaseSkeleton/SkeletonSidebar.vue'

const factory = (props?: Record<string, unknown>) =>
  mount(SkeletonSidebar, { props: { active: false, ...props } })

describe('SkeletonSidebar Component', () => {
  it('renders property', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('check active props', () => {
    const wrapper = factory({ active: true })

    expect(
      wrapper.find('[data-test="sidebar"]').findComponent('[data-test="circle"]').exists()
    ).toBe(true)

    expect(
      wrapper.find('[data-test="sidebar"]').findComponent('[data-test="paragraph"]').exists()
    ).toBe(true)
  })

  it('check rows props', () => {
    const wrapper = factory({ rows: 5, active: true })

    expect(
      wrapper.find('[data-test="sidebar"]').findComponent('[data-test="circle"]').isVisible()
    ).toBe(true)

    expect(
      wrapper.find('[data-test="sidebar"]').findComponent('[data-test="paragraph"]').isVisible()
    ).toBe(true)
  })
})
