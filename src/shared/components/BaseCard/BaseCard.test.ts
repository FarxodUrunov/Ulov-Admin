import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseCard from './BaseCard.vue'

const factory = (props?: Record<string, unknown>, slots?: { [key: string]: string }) => {
  return mount(BaseCard, {
    props,
    slots
  })
}

describe('BaseCard Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks title prop', () => {
    const wrapper = factory({ title: 'Card title' })
    expect(wrapper.find('[data-test="header"]').text()).toBe('Card title')
  })

  it('checks actions hidden', () => {
    const wrapper = factory({ actions: false })
    expect(wrapper.find('[data-test="actions"]').exists()).toBe(false)
  })

  it('checks actions: edit - visible, delete - hidden', () => {
    const wrapper = factory({ actions: { edit: true, delete: false } })

    expect(wrapper.find('[data-test="actions"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="actions-edit"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="actions-delete"]').exists()).toBe(false)
  })

  it('checks actions: edit - hidden, delete - visible', () => {
    const wrapper = factory({ actions: { edit: false, delete: true } })

    expect(wrapper.find('[data-test="actions"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="actions-edit"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="actions-delete"]').exists()).toBe(true)
  })

  it('checks emited event: edit', () => {
    const wrapper = factory({ actions: { edit: true, delete: false } })

    wrapper.find('[data-test="actions-edit"]').trigger('click')
    const actionsEvent = wrapper.emitted('actions')

    expect(actionsEvent).toHaveLength(1)
    expect(wrapper.emitted()).toHaveProperty('actions')
    if (actionsEvent) {
      expect(actionsEvent[0]).toEqual(['edit'])
    }
  })

  it('checks emited event: delete', () => {
    const wrapper = factory({ actions: { edit: false, delete: true } })

    wrapper.find('[data-test="actions-delete"]').trigger('click')
    const actionsEvent = wrapper.emitted('actions')

    expect(actionsEvent).toHaveLength(1)
    expect(wrapper.emitted()).toHaveProperty('actions')
    if (actionsEvent) {
      expect(actionsEvent[0]).toEqual(['delete'])
    }
  })

  it('checks header slot', () => {
    const slotText = 'Checking header slot'
    const wrapper = factory(
      {},
      {
        header: `<h3 data-test="header">${slotText}</h3>`
      }
    )

    expect(wrapper.find('[data-test="header"]').text()).toBe(slotText)
  })

  it('checks default slot', () => {
    const slotText = 'Checking default slot'
    const wrapper = factory(
      {},
      {
        default: `<p data-test="default">${slotText}</p>`
      }
    )

    expect(wrapper.find('[data-test="default"]').text()).toBe(slotText)
  })
})
