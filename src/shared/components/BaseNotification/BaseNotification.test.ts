import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseNotification from './BaseNotification.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseNotification, { props: { notifications: [], ...props } })
}

describe('BaseNotification component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks placement prop', () => {
    const wrapper = factory({ placementX: 'start', placementY: 'end' })
    expect(wrapper.find('[data-test="position"]').classes()).toEqual(
      expect.arrayContaining(['left-0', 'bottom-0'])
    )
  })
})
