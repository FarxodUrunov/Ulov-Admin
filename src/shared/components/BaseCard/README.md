## BaseCard Component

### This component accepts these props:

```ts
interface BaseCardProps {
  title?: string
  actions?: { edit?: boolean; delete?: boolean } | boolean
}
```

### Examples

```vue
<BaseCard title="Some title" :actions="{ edit: true, delete: true }">
  <div>Some content</div>
</BaseCard>
```
