## BaseSwitch Component

### This component accepts these props:

```ts
interface Props {
  modelValue: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}
```

##### Default props:

- size = 'md'

### Examples

```vue
<BaseSwitch v-model="dontDistrub" label="Не беспокоить" />
```
