## BaseTextEditor component takes 4 props:

```ts
interface Props {
  modelValue: any
  message: string
  contentType?: 'delta' | 'html' | 'text'
  error?: boolean
}
```

##### Default props:

- contentType = 'html'

```vue
<BaseTextEditor v-model="text" message="Error" content-type="html" :error="true" />
```
