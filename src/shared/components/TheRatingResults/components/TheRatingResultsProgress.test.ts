import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheRatingResultsProgress from './TheRatingResultsProgress.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TheRatingResultsProgress, { props })
}

describe('TheRatingResultsReviews Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks classes', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="progress-child-classes"]').classes()).toContain('flex')
  })
})
