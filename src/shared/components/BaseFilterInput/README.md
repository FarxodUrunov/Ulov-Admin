//////// Base Filter-Input Usage //////////

Accepts: props, that is:

1. id - required, it should be unique
2. name - required, it should be unique
3. size - optionaj, values = "lg" | "md" | "sm";
   default: lg
4. disabled - optional, type = boolean, default:false,
5. readonly - optional, type = boolean, default:false,
6. suffix - oprional, values = one of icons' name
7. iconColor - optional, value = tailwind text colors, use it only suffix prop is used
8. search - optional, type = boolean, default:false, switch to search input
9. bgColor - optional, value = 'light'|'', default: ''
10. placeHolder - optional, placeholder for input

You can get input value by v-model as usual, you can see examples below:

Basic usage:

```ts
<script setup lang="ts">
  import FilterInput from '@/shared/components/FilterInput/FilterInput.vue' import {ref} from 'vue'
  const value = ref('')
</script>
<template>
  <div class="w-1/2 mx-auto mt-8">
    Default
    <FilterInput
      id="default"
      name="FilterInputDefault"
      placeHolder="Seach something"
    />
  </div>
</template>
```

Using type:

Default

```ts
<FilterInput id="default" name="FilterInputDefault" placeHolder="Seach something" />
```

Default Light

```ts
<FilterInput
  id="default"
  name="FilterInputDefault"
  placeHolder="Seach something"
  bgColor="light"
  search
  v-model="value"
/>
```

Disabled

```ts
<FilterInput
      id="disabled"
      name="FilterInputdisabled"
      placeHolder="Seach something"
      :disabled="true"
    />
```

Readonly

```ts
 <FilterInput
      id="readonly"
      name="FilterInputreadonly"
      placeHolder="Seach something"
      :readonly="true"
    />
```

Search

```ts
 <FilterInput
      id="readonly"
      name="FilterInputreadonly"
      placeHolder="Seach something"
      :search="true"
    />
```

Suffix icon

```ts
<FilterInput
  id="suffix"
  name="FilterInputsuffix"
  suffix="advertise"
  iconColor="text-success"
  placeHolder="Seach something"
/>
```

Suffix Slot

```ts
<FilterInput id="suffixslot" name="FilterInputsuffixslot" placeHolder="Seach something">
  <template #suffix>
    <BaseIcon name="archive" class="w-5 h-5 text-gray-dark" />
  </template>
</FilterInput>
```

All in One

```ts
<script setup lang="ts">
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import FilterInput from '@/shared/components/FilterInput/FilterInput.vue'
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <div class="w-1/2 mx-auto mt-8">
    Default
    <FilterInput id="default" name="FilterInputDefault" placeHolder="Seach something" size="sm" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    Default Light
    <FilterInput
      id="default"
      name="FilterInputDefault"
      placeHolder="Seach something"
      bgColor="light"
      search
      size="sm"
      v-model="value"
    />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    disabled
    <FilterInput
      id="disabled"
      name="FilterInputdisabled"
      placeHolder="Seach something"
      :disabled="true"
    />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    readonly
    <FilterInput
      id="readonly"
      name="FilterInputreadonly"
      placeHolder="Seach something"
      :readonly="true"
    />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    search
    <FilterInput
      id="readonly"
      name="FilterInputreadonly"
      placeHolder="Seach something"
      :search="true"
    />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    suffix
    <FilterInput
      id="suffix"
      name="FilterInputsuffix"
      suffix="advertise"
      iconColor="text-success"
      placeHolder="Seach something"
    />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    suffix Slot
    <FilterInput id="suffixslot" name="FilterInputsuffixslot" placeHolder="Seach something">
      <template #suffix>
        <BaseIcon name="archive" class="w-5 h-5 text-gray-dark" />
      </template>
    </FilterInput>
  </div>
</template>
```
