## BaseDropdown Component

### This component accepts these props:

```ts
interface BaseModalProps {
  modelValue: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  modelVariant?: string
  headerVariant?: string
  bodyVariant?: string
  footerVariant?: string
  headerText?: string
  cancelText?: string
  confirmText?: string
  cancelVariant?: ButtonVariant
  confirmVariant?: ButtonVariant
  cancelLoading?: boolean
  confirmLoading?: boolean
  centered?: boolean
  headerCentered?: boolean
  static?: boolean
  hideCloseButton?: boolean
  hideHeader?: boolean
  hideFooter?: boolean
}
```

#### Default props

- size: 'md',
- headerText = 'Modal'
- cancelText = 'Cancel'
- confirmText = 'Confirm'
- cancelVariant = 'primary'
- confirmVariant = 'primary'
- centered = true

### Examples

```vue
<BaseModal
  v-model="showModal"
  header-text="Lorem ipsum dolor sit amet"
  :confirm-loading="loading"
  :cancel-loading="loading"
  :hide-close-button="loading"
  :static="loading"
  size="lg"
  @confirm="loading = true"
>
  <template #body>
    <p class="mb-2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit unde aspernatur, corrupti
      dignissimos ut eaque vel quod nobis mollitia, maiores ab culpa magnam perferendis facilis.
    </p>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit unde aspernatur, corrupti
      dignissimos ut eaque vel quod nobis mollitia, maiores ab culpa magnam perferendis facilis.
    </p>
  </template>
</BaseModal>
```
