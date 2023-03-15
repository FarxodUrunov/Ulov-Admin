import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from './BaseInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

const factory = (props?: Record<string, unknown>, slots?: { suffix: string } | undefined) => {
  return mount(BaseInput, {
    props: { id: 'input', name: 'baseinput', modelValue: '', label: 'Enter Name', ...props },
    slots
  })
}

describe('BaseInput', () => {
  it('Render Properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })
  it('label prop', () => {
    const wrapper = factory()

    expect(wrapper.find('label').text()).toBe('Enter Name')
  })
  it('type prop', () => {
    const wrapper = factory({
      type: 'number'
    })

    expect(wrapper.find('input').attributes().type).toBe('number')
  })
  it('errors props', () => {
    const wrapper = factory({ error: true })

    expect(wrapper.find('#input').classes()).toContain('border-error')
  })
  it('success props', () => {
    const wrapper = factory({ success: true })

    expect(wrapper.find('#input').classes()).toContain('border-success')
  })
  it('disabled props', () => {
    const wrapper = factory({ disabled: true })

    expect(wrapper.find('#input').classes()).toContain('!cursor-not-allowed')
  })
  it('readonly props', () => {
    const wrapper = factory({ readonly: true })

    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })
  it('suffix props', () => {
    const wrapper = factory({ suffix: 'menu', iconColor: 'text-success' })

    expect(wrapper.findComponent(BaseIcon).props('name')).toBe('menu')
    expect(wrapper.findComponent(BaseIcon).classes()).toContain('text-success')
  })
  it('suffix slots', () => {
    const wrapper = factory(
      {},
      {
        suffix: `<template #suffix="params">
    Hello World
      </template>
    `
      }
    )

    expect(wrapper.html()).toContain('Hello World')
    expect(wrapper.find('input').classes()).toContain('pr-14')
  })
  it('tel type props', async () => {
    const wrapper = factory({ type: 'tel' })
    const input = wrapper.find('input')

    expect(input.element.value).toContain('+998')
  })
  it('should render default value', () => {
    const wrapper = factory({ modelValue: 'I am default value' })
    expect(wrapper.find('input').element.value).toBe('I am default value')
  })
})
