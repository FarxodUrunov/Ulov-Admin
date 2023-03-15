import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheRatingResults from './TheRatingResults.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TheRatingResults, { props })
}

describe('TheRatingResultsReviews Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks classes', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="parent-classes"]').classes()).toContain('flex')
  })
})
