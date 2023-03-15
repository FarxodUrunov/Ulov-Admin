import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Breadcrumb from './BaseBreadcrumb.vue'

const factory = (props?: Record<string, unknown>) => {
  return mount(Breadcrumb, {
    props: {
      breadcrumb: [],
      ...props
    }
  })
}

describe('BaseBreadcrumb component', () => {
  it('renders as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('checks solid props', () => {
    const wrapper = factory({ solid: true })
    expect(wrapper.find('[data-test="breadcrumb"]').classes()).toEqual(
      expect.arrayContaining([
        'px-5',
        'py-3',
        'border',
        'rounded-lg',
        'text-gray-dark',
        'border-gray-light'
      ])
    )
  })
})
