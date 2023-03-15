import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseWorkDays from './BaseWorkDays.vue'

describe('BaseWorkDays Component', () => {
  it('imports as expected', () => {
    const wrapper = mount(BaseWorkDays, {
      props: { modelValue: [false, false, false, false, false, false, false] }
    })
    expect(wrapper).toBeDefined()
  })
})
