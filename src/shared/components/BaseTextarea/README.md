## BaseTextarea Component

### This component accepts these props:

```ts
interface TextareaProps {
  modelValue: string
  name: string
  placeholder: string
  rows?: number
  message?: string
  success?: boolean
  error?: boolean
  disabled?: boolean
}
```

##### Default props:

- rows = 5

### Examples

```vue
<BaseTextarea v-model="comment" name="comment" placeholder="Комментарий" />
<BaseTextarea
  v-model="comment"
  name="comment"
  placeholder="Комментарий"
  error
  message="This field is required"
/>
<BaseTextarea v-model="comment" name="comment" placeholder="Комментарий" success />
<BaseTextarea v-model="comment" name="comment" placeholder="Комментарий" :rows="8" />
```
