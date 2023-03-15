## BaseSkeleton Component

### This component accepts the following options:

- Header
- Sidebar

### Header variant

```ts
interface Props {
  active: boolean
}
```

### Sidebar variant

```ts
interface Props {
  rows?: number
  active: boolean
}
```

### Examples

```vue
<SkeletonHeader :active="true">Header content</SkeletonHeader>
<SkeletonSidebar :active="true" :rows="10">Sidebar content</SkeletonSidebar>
```
