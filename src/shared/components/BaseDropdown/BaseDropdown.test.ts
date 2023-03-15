import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseDropdown from './BaseDropdown.vue'

interface SingleItem {
  id: string
  label: string
  icon: 'profileOutline' | 'notificationOutline' | 'logoutOutline'
  color: string
}

const links: SingleItem[] = [
  {
    id: 'profile',
    label: 'Профиль',
    icon: 'profileOutline',
    color: 'w-6 h-6 text-gray-dark'
  },
  {
    id: 'notification',
    label: 'Уведомление',
    icon: 'notificationOutline',
    color: 'w-6 h-6 text-gray-dark'
  },
  {
    id: 'logout',
    label: 'Выход',
    icon: 'logoutOutline',
    color: 'w-6 h-6 text-gray-dark'
  }
]

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({ name: 'home', path: '/' }))
}))

const factory = (
  props?: Record<string, unknown>,
  slots: { [key: string]: string } = { default: 'Button' }
) => {
  return mount(BaseDropdown, {
    props: { items: [links], ...props },
    slots
  })
}

describe('BaseDropdown Component', () => {
  it('imports as expected', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
    expect(wrapper.find('[data-test="tooltip"]').isVisible()).toBe(false)
  })

  it('opens dropdown', async () => {
    const wrapper = factory({ mode: 'click', tooltipClass: 'min-w-[180px]' })

    await wrapper.find('[data-test="dropdown-btn"]').trigger('click')

    expect(wrapper.find('[data-test="tooltip"]').classes()).toContain('min-w-[180px]')
    expect(wrapper.find('[data-test="tooltip"]').isVisible()).toBe(true)
  })

  it('checks classes', () => {
    const wrapper = factory({
      tooltipClass: 'tooltip-class',
      menuClass: 'menu-class',
      itemsClass: 'items-class',
      itemClass: 'item-class'
    })

    expect(wrapper.find('[data-test="tooltip"]').classes()).toContain('tooltip-class')
    expect(wrapper.find('[data-test="menu"]').classes()).toContain('menu-class')
    expect(wrapper.find('[data-test="menu-items"]').classes()).toContain('items-class')
    expect(wrapper.find('[data-test="menu-item"]').classes()).toContain('item-class')
  })

  it('closes dropdown', async () => {
    const wrapper = factory({ mode: 'click', tooltipClass: 'min-w-[180px]' })

    await wrapper.find('[data-test="dropdown-btn"]').trigger('click')
    await wrapper.find('[data-test="menu-item"]').trigger('click')

    expect(wrapper.find('[data-test="tooltip"]').isVisible()).toBe(false)
  })

  it('uses mode: hover', async () => {
    const wrapper = factory({ mode: 'hover', tooltipClass: 'min-w-[180px]' })

    await wrapper.trigger('mouseover')
    expect(wrapper.find('[data-test="tooltip"]').isVisible()).toBe(true)

    await wrapper.trigger('mouseleave')
    expect(wrapper.find('[data-test="tooltip"]').isVisible()).toBe(false)
  })

  it('checks trigger slot', async () => {
    const wrapper = factory(
      { mode: 'click' },
      {
        trigger: `<template #scoped="{ open }">
          This is trigger {{ open }}
          </template>
        `
      }
    )

    await wrapper.find('[data-test="dropdown-btn"]').trigger('click')

    expect(wrapper.find('[data-test="dropdown-btn"]').text()).toBe('This is trigger true')
  })

  it('checks item slot', async () => {
    const wrapper = factory(
      { mode: 'click' },
      {
        item: `<template #scoped="{ item }">
            <button 
              :data-id="item.id"
              :data-icon="item.icon"
              :data-color="item.color"
            >
              {{ item.label }}
            </button>
          </template>
        `
      }
    )

    expect(wrapper.find('[data-test="menu-item"]').html()).toMatchSnapshot()
  })
})
