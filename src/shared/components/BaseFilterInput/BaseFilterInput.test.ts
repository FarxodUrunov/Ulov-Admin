import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterInput from './BaseFilterInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'

const factory = (props?: Record<string, unknown>, slots?: { suffix: string } | undefined) => {
  return mount(FilterInput, {
    props: { id: '#input', name: 'baseFilterInput', label: 'Enter Name', ...props },
    slots
  })
}

describe('FilterInput', () => {
  it('Render Properly', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('disabled props', () => {
    const wrapper = factory({ disabled: true })
    expect(wrapper.find('input').classes()).toContain('cursor-not-allowed')
  })

  it('search props', () => {
    const wrapper = factory({ search: true })
    expect(wrapper.find('input').classes()).toContain('pl-9')
  })

  it('bgColor props', () => {
    const wrapper = factory({ bgColor: 'light' })
    expect(wrapper.find('input').classes()).toContain('bg-light')
  })

  it('checks wrapperVariant prop', () => {
    const wrapper = factory({ wrapperVariant: 'wrapper-variant' })
    expect(wrapper.classes()).toContain('wrapper-variant')
  })

  it('checks inputVariant prop', () => {
    const wrapper = factory({ inputVariant: 'input-variant' })
    expect(wrapper.find('input').classes()).toContain('input-variant')
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
    expect(wrapper.find('input').classes()).toContain('pr-9')
  })
})
