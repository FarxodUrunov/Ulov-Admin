import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SelectedItems from './SelectedItems.vue'

const items = [
  { id: 4, name: 'Maria' },
  { id: 5, name: 'Sofia' },
  { id: 6, name: 'Bebegim' }
]

const factory = () => {
  return mount(SelectedItems, {
    props: {
      mode: 'filter',
      disabled: false,
      selectedItems: items,
      label: 'name',
      openItems: true
    }
  })
}

describe('SelectedItems', () => {
  it('render selected items', () => {
    const wrapper = factory()

    const items = wrapper.findAll('[data-test="selecteds"]')

    expect(items.length).toBe(3)
  })

  it('emit unselected elements', async () => {
    const wrapper = factory()

    await wrapper.find('[data-test="icon-1"]').trigger('click')

    const events: any = wrapper.emitted('select')

    expect(events).toEqual([[{ id: 5, name: 'Sofia' }]])
  })
})
