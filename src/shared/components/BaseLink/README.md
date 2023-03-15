## BaseLink Component

### This component accepts these props:

```ts
import { type RouteLocationRaw } from 'vue-router'
import type { Icon } from '@/shared/components/BaseButton/types'

interface BaseLinkProps {
  to: RouteLocationRaw
  replace?: boolean
  variant?: 'primary' | 'error'
  size?: 'sm' | 'md' | 'lg'
  icon?: Icon
  link?: boolean
  centered?: boolean
  outlined?: boolean
  loading?: boolean
  disabled?: boolean
}
```

##### Default props:

- variant = 'primary'
- size = 'md'
- centered = true

### Examples

```vue
<BaseLink :to="{ name: 'auth_login' }">Link</BaseLink>
<BaseLink
  to="/auth/login"
  size="lg"
  variant="error"
  :icon="{ name: 'filter', position: 'left', className: 'text-red' }"
>
  Link with icon
</BaseLink>
<BaseLink to="/auth/login" variant="error" outlined>Link outlined</BaseLink>
<BaseLink to="/auth/login" size="lg" link>Button link</BaseLink>
<BaseLink to="/auth/login" :loading="isLoading">Link with loading</BaseLink>
```
