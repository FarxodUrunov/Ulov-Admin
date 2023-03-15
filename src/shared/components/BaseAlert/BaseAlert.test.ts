import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseAlert from './BaseAlert.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseAlert, {
    props: { title: 'Test title', ...props },
    global: { stubs: { BaseIcon: true } }
  })
}

describe('BaseAlert Component', () => {
  it('checks title prop', () => {
    const wrapper = factory({ title: 'Title 1' })
    expect(wrapper.find('[data-test="title"]').text()).toBe('Title 1')
  })

  it('checks type="info" prop', () => {
    const wrapper = factory({ type: 'info' })
    const BaseIcon = wrapper.find('base-icon-stub')

    expect(BaseIcon.attributes('name')).toBe('infoCircle')
    expect(BaseIcon.classes()).toEqual(['text-secondary', 'w-14', 'h-14'])
    expect(BaseIcon.attributes('viewbox')).toBe('0 0 24 24')
  })

  it('checks type="success" prop', () => {
    const wrapper = factory({ type: 'success' })
    const BaseIcon = wrapper.find('base-icon-stub')

    expect(BaseIcon.attributes('name')).toBe('tickCircle')
    expect(BaseIcon.classes()).toEqual(['text-success', 'w-12', 'h-12', 'mb-1'])
    expect(BaseIcon.attributes('viewbox')).toBe('0 0 20 20')
  })

  it('checks type="warning" prop', () => {
    const wrapper = factory({ type: 'warning' })
    const BaseIcon = wrapper.find('base-icon-stub')

    expect(BaseIcon.attributes('name')).toBe('warningInfo')
    expect(BaseIcon.classes()).toEqual(['text-warning', 'w-14', 'h-14'])
    expect(BaseIcon.attributes('viewbox')).toBe('0 0 256 256')
  })
})
