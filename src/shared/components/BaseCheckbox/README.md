## BaseCheckbox Component

### This is component accepts these props:

```ts
interface BaseCheckboxProps {
  modelValue: any
  id: string
  disabled?: boolean
  label?: string
  labelVariant?: string
  indeterminate?: boolean
}
```

```vue
<BaseCheckbox v-model="bool" id="carParts" label="Двигатель и коробка" />
```
