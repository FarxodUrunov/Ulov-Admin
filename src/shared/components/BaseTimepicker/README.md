## BaseTimepicker component

### This component accepts these props:

```ts
interface Props {
  id: string
  name: string
  label: string
  modelValue?: any
  required?: boolean
  disabled?: boolean
  readonly?: boolean
}
```

### Examples

```vue
<BaseTimepicker v-model="date" id="id" name="timepicker" label="До" />
<BaseTimepicker v-model="date" id="id" name="timepicker" label="После" />
<BaseTimepicker
  v-model="date"
  id="id"
  name="timepicker"
  label="После"
  error
  message="This field is required"
/>
<BaseTimepicker v-model="date" id="id" name="timepicker" label="После" success />
```
