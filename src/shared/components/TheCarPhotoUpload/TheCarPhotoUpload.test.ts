import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TheCarPhotoUpload from './TheCarPhotoUpload.vue'

const images = [
  {
    id: 13625,
    name: 'Screenshot from 2022-12-19 15-55-27.png',
    path: 'https://s1.1zoom.ru/big7/888/Eyes_Owls_Bubo_502568.jpg',
    size: 13625
  },
  {
    id: 96477,
    name: 'Screenshot from 2022-12-16 16-22-39.png',
    path: 'https://i.pinimg.com/originals/b4/c9/f8/b4c9f8699e6a63ba2d6d4d55c6d80b75.jpg',
    size: 96477
  }
]

const factory = (props?: Record<string, unknown>) => {
  return mount(TheCarPhotoUpload, { props })
}

describe('TheCarPhotoUpload component', () => {
  it('Render properly', () => {
    const wrapper = factory()

    expect(wrapper).toBeDefined()
  })

  it('Render with custom title', () => {
    const wrapper = factory({ title: 'Upload up to 4 images' })

    expect(wrapper.find('p').text()).toBe('Upload up to 4 images')
  })

  it('Render default four image input place', () => {
    const wrapper = factory()

    expect(wrapper.findAll('[data-test="list"]').length).toBe(4)
  })

  it('Render 10 image input place', () => {
    const wrapper = factory({ limitNumber: 10 })

    expect(wrapper.findAll('[data-test="list"]').length).toBe(10)
  })

  it('Render default images', () => {
    const wrapper = factory({ modelValue: images })

    expect(wrapper.findAll('img').length).toBe(2)
  })

  it('Update modelValue and get emit', async () => {
    const wrapper = factory()

    await wrapper.setValue({ files: images })

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        {
          files: images
        }
      ]
    ])
  })

  it('Check editable or not', () => {
    const wrapper = factory({ disabled: true })

    expect(wrapper.find('input').element.disabled).toBe(false)
  })

  it('Success status', () => {
    const wrapper = factory({ success: true })

    expect(wrapper.find('[data-test="border"]').classes()).toContain('border-success')
  })

  it('Error status', () => {
    const wrapper = factory({ error: true })

    expect(wrapper.find('[data-test="border"]').classes()).toContain('border-error')
  })
})
