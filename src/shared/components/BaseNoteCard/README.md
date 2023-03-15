## BaseNoteCard Component

### This component accepts these props:

```ts
interface Props {
  date?: string
  img?: string
  title?: string
  total?: number
  description?: string
}
```

##### Default props:

- date: '',
- img: '',
- title: '',
- total: 0,
- description: ''

### Examples

```vue
<BaseNoteCard
  img="public/test.png"
  title="Доверенность"
  date="2023-11-09"
  description="Общая"
  :total="365"
/>
```
