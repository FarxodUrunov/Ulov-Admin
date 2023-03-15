## BaseButton Component

### This component accepts these props:

```ts
interface BaseImageProps {
  src?: string
  alt?: string
  type?: 'logo' | 'user' | 'img'
}
```

##### Default props:

- src = ''
- alt = ''
- type = 'img'

### Examples

```vue
<BaseImage src="https://via.placeholder.com/150" alt="placeholder" />
<BaseImage type="logo" src="https://via.placeholder.com/150" alt="placeholder" />
```
