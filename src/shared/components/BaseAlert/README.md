## BaseAlert Component

### This component accepts these props:

```ts
interface Props {
  title: string
  type?: 'info' | 'success' | 'warning' | 'error'
}
```

##### Default props:

- type = 'error'

### Examples

```vue
<BaseAlert :title="t('app.noDataFound')" type="error" />
```
