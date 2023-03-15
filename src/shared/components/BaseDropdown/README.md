## BaseDropdown Component

### This component accepts these props:

```ts
import { Placement, PositioningStrategy } from '@popperjs/core'

interface Props {
  items: any[][]
  mode?: 'click' | 'hover'
  default: 'click'
  placement?: Placement
  strategy?: PositioningStrategy
  preventOverflow?: number
  default: 8
  tooltipClass?: string
  menuClass?: string
  itemsClass?: string
  itemClass?: string
}
```

### Examples

```vue
<BaseDropdown
  :items="[[{ title: 'Dropdown 1' }, { title: 'Dropdown 2' }]]"
  strategy="absolute"
  placement="bottom-end"
  tooltip-class="min-w-[180px]"
>
  <template #trigger>Open Dropdown</template>
  <template #item="{ item }">
    <button>{{ item.name }}</button>
  </template>
</BaseDropdown>
```
