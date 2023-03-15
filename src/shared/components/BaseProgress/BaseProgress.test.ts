import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseProgress from './BaseProgress.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseProgress, { props: { current: 5, total: 10, ...props } })
}

describe('BaseProgress Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks progress classes', () => {
    const wrapper = factory()
    expect(wrapper.findAll('div')[2].classes('bg-yellow-dark')).toBe(true)
  })

  it('checks props label', () => {
    const wrapper = factory({ current: 8 })
    expect(wrapper.find('span').text()).toBe('8')
  })

  it('checks props progress', () => {
    const wrapper = factory({ current: 7.5 })
    expect(wrapper.find('[style="width: 75%;"]'))
  })

  it('checks props color', () => {
    const wrapper = factory({ color: 'red' })
    expect(wrapper.findAll('div')[2].classes()).toContain('bg-error')
  })
})
