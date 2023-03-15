## TheReviewCard Component

### This component accepts these props:

```ts
import type { ReviewCardProps } from './types'
type Props = ReviewCardProps
```

##### Default props:

- vehicleModel: '',
- avatar: '',

### Examples

```vue
<TheReviewCard
  fullName="Тошмат Эшматов"
  vehicleModel="Chevrolet , Cobalt"
  description="Очень хороший автотехцентр"
  :rating="4.5"
  date="14.12.2022"
  avatar="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
/>
```
