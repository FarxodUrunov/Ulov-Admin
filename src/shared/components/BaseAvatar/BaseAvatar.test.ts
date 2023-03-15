import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseAvatar from './BaseAvatar.vue'

const online = { status: 'online' }
const image = 'https://getuser.com/image.png'
const factory = (props?: Record<string, unknown>) => {
  return mount(BaseAvatar, { props: { src: image, ...props } })
}

describe('Avatar component', () => {
  it('renders properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('check stacked prop', () => {
    const wrapper = factory({ stacked: true })

    expect(wrapper.find('img').classes()).toEqual(
      expect.arrayContaining(['border-2', 'border-white'])
    )
  })

  it('check size xs prop', () => {
    const wrapper = factory({ size: 'xs' })

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['w-6', 'h-6']))
  })

  it('check size sm prop', () => {
    const wrapper = factory({ size: 'sm' })

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['w-8', 'h-8']))
  })

  it('check size md prop', () => {
    const wrapper = factory({ size: 'md' })

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['w-10', 'h-10']))
  })

  it('check size lg prop', () => {
    const wrapper = factory({ size: 'lg' })

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['w-20', 'h-20']))
  })

  it('check size xl prop', () => {
    const wrapper = factory({ size: 'xl' })

    expect(wrapper.find('img').classes()).toEqual(expect.arrayContaining(['w-36', 'h-36']))
  })

  it('check status online prop', () => {
    const wrapper = factory({ ...online })

    expect(wrapper.find('span').classes()).toContain('bg-teal')
  })

  it('check status offline prop', () => {
    const wrapper = factory({ status: 'offline' })

    expect(wrapper.find('span').classes()).toContain('bg-error')
  })

  it('check img prop', () => {
    const wrapper = factory({ src: image })

    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('check alt prop', () => {
    const wrapper = factory({ alt: 'Avatar' })

    expect(wrapper.find('img').attributes('alt')).toContain('Avatar')
  })

  it('check rounded prop', () => {
    const wrapper = factory({ rounded: true })

    expect(wrapper.find('img').classes()).toContain('rounded-full')
  })

  it('check topLeft status position prop', () => {
    const wrapper = factory({ statusPosition: 'top-left', ...online })

    expect(wrapper.find('[data-test="top-left"]').classes()).toEqual(
      expect.arrayContaining(['top-0', 'left-0', '-translate-y-1/2'])
    )
  })

  it('check topRight status position prop', () => {
    const wrapper = factory({ statusPosition: 'top-right', ...online })

    expect(wrapper.find('[data-test="top-right"]').classes()).toEqual(
      expect.arrayContaining(['-top-1.5', '-right-1.5'])
    )
  })

  it('check bottomLeft status position prop', () => {
    const wrapper = factory({ statusPosition: 'bottom-left', ...online })

    expect(wrapper.find('[data-test="bottom-left"]').classes()).toEqual(
      expect.arrayContaining(['-bottom-1.5', 'left-0', 'transform', '-translate-x-1/2'])
    )
  })

  it('check bottomRight status position prop', () => {
    const wrapper = factory({ statusPosition: 'bottom-right', ...online })

    expect(wrapper.find('[data-test="bottom-right"]').classes()).toEqual(
      expect.arrayContaining(['bottom-0', '-right-1.5', 'translate-y-1/2'])
    )
  })
})
