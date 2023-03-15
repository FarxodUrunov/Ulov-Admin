import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { dateDiffInDays } from '@/shared/utils'
import BaseNoteCard from './BaseNoteCard.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BaseNoteCard, { props })
}

describe('BaseNoteCard Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('checks type prop title', () => {
    const wrapper = factory({ title: 'Hello' })

    expect(wrapper.find('[data-test="title"]').text()).toBe('Hello')
  })

  it('checks type prop total, endDate description', () => {
    const props = { total: 365, date: '2023-05-05', description: 'World' }

    const wrapper = factory(props)

    const days = dateDiffInDays(new Date(), new Date(props.date))

    expect(wrapper.find('[data-test="days"]').text()).toContain(days)
    expect(wrapper.find('[data-test="description"]').text()).toContain('World')
    expect(wrapper.find('[data-test="end-date"]').text()).toContain('05.05.2023')
  })
})
