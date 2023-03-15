import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BreadcrumbItem from './BreadcrumbItem.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(BreadcrumbItem, {
    props: {
      item: { name: 'Breadcrumb item', path: '/test-path' },
      index: 0,
      ...props
    },
    global: {
      stubs: {
        BaseLink: {
          template: '<a><slot /></a>'
        }
      }
    }
  })
}

describe('BreadcrumbItem component', () => {
  it('renders as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks label prop', () => {
    const wrapper = factory({ item: { name: 'Breadcrumb item 1', path: '/test-path' } })
    expect(wrapper.find('a').text()).toBe('Breadcrumb item 1')
  })

  it('checks label prop: current', () => {
    const wrapper = factory({
      item: { name: 'Breadcrumb item 1', path: '/test-path', current: true }
    })
    expect(wrapper.find('span').text()).toBe('Breadcrumb item 1')
  })
})
