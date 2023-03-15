import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheRatingResultsReviews from './TheRatingResultsReviews.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TheRatingResultsReviews, { props })
}

describe('TheRatingResultsReviews Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks ratingScore prop', () => {
    const wrapper = factory({ ratingScore: 5 })

    expect(wrapper.find('[data-test="rating-score"]').text()).toBe('5')
  })

  it('checks numberOfReviews prop', () => {
    const wrapper = factory({ numberOfReviews: 15 })

    expect(wrapper.find('[data-test="number-of-reviews"]').exists()).toBe(true)
  })
})
