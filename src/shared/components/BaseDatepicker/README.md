## BaseDatepicker component

### This component accepts these props:

```ts
interface Props {
  modelValue: any
  id: string
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
}
```

### Examples

```vue
<BaseDatepicker v-model="date" id="test-datepicker1" name="test-datepicker1" label="Text field" />
```
