The BaseRating component takes 3 props, 2 optional

1. "modelValue" to inform rating
2. "size": "sm" | "md", default: "sm
3. "disabled" prop should be false for "click"

```vue
<BaseRating v-model="ratingNumber" :disabled="true" />
```
