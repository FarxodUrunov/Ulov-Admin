import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheSectionInfo from './TheSectionInfo.vue'
import type { SectionInfoProps } from './types'

const factory = (props?: Partial<SectionInfoProps>, slots?: { [key: string]: string }) => {
  return mount(TheSectionInfo, {
    props: {
      image: {
        src: 'https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      ...props
    } as SectionInfoProps,
    slots,
    global: { stubs: { BaseButton: true } }
  })
}

describe('TheSectionInfo component', () => {
  it('imports as expected', () => {
    const wrapper = factory()
    expect(wrapper).toBeDefined()
  })

  it('sets image', () => {
    const wrapper = factory({
      image: {
        src: 'https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Service image',
        type: 'img',
        rounded: true,
        large: true
      }
    })

    const image = wrapper.find('[data-test="sectionInfo-image"]')

    expect(image.exists()).toBe(true)
    expect(image.attributes('alt')).toBe('Service image')
    expect(image.classes()).toEqual(expect.arrayContaining(['rounded-full', 'w-full', 'max-w-xs']))
  })

  it('checks default slot', () => {
    const wrapper = factory(undefined, {
      default: 'Content'
    })

    expect(wrapper.text()).toContain('Content')
  })

  it('checks actions prop', async () => {
    const wrapper = factory({ actions: { edit: true, delete: true } })

    expect(wrapper.find('[data-test="actions-edit"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="actions-delete"]').exists()).toBe(true)
  })
})
