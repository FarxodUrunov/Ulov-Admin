## BaseBadge Component

### This component accepts these props:

```ts
interface Props {
  variant?: 'success' | 'secondary' | 'error'
  text?: string | number
}
```

##### Default props:

- variant: 'secondary'
- text: ''

### Example

```vue
<BaseBadge variant="success" text="Замена аккумуляторной батареии" />
```
