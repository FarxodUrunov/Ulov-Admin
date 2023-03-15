import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TheReviewCard from './TheReviewCard.vue'

import BaseAvatar from '@/shared/components/BaseAvatar/BaseAvatar.vue'
import BaseRating from '@/shared/components/BaseRating/BaseRating.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(TheReviewCard, {
    props: {
      fullName: 'Adam',
      description: 'Hello',
      date: '2022-12-14',
      rating: 4.5,
      ...props
    }
  })
}

describe('TheReviewCard Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks fullName prop', () => {
    const wrapper = factory({ fullName: 'John Smit' })

    expect(wrapper.find('[data-test="fullName"]').text()).toBe('John Smit')
  })

  it('checks vehicleModel prop', () => {
    const wrapper = factory({ vehicleModel: 'Chevrolet, Spark' })

    expect(wrapper.find('[data-test="vehicleModel"]').text()).toBe('Chevrolet, Spark')
  })

  it('checks description prop', () => {
    const wrapper = factory({ description: 'Ok' })

    expect(wrapper.find('[data-test="description"]').text()).toBe('Ok')
  })

  it('checks date prop', () => {
    const wrapper = factory({ date: '2022-12-26' })

    expect(wrapper.find('[data-test="date"]').text()).toBe('26.12.2022')
  })

  it('get BaseRating component', () => {
    const wrapper = factory({ rating: 4 })

    expect(wrapper.getComponent(BaseRating).html()).toContain('style="width: 80%;"')
  })

  it('get BaseAvatar component', () => {
    const wrapper = factory({ avatar: 'test' })

    expect(wrapper.getComponent(BaseAvatar).html()).toContain('test')
  })
})
