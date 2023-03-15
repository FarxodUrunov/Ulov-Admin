//////// Base Input Usage //////////

Accepts: props, that is:

1. id - required, it should be unique
2. name - required, it should be unique
3. type - optional, values= "text" | "number" | "tel" | "email" | "password";
   default: text
4. label - optional, label of input
5. size - optionaj, values = "lg" | "md" | "sm";
   default: lg
6. error - optional, type = boolean, default:false,
7. message - optional, message of error, it shows only error=true
8. disabled - optional, type = boolean, default:false,
9. readonly - optional, type = boolean, default:false,
10. success - optional, type = boolean, default:false,
11. suffix - oprional, values = one of icons' name
12. iconColor - optional, value = tailwind text colors, use it only suffix prop is used

You can get input value by v-model as usual, you can see examples below:

Basic usage:

```ts
<script setup lang='ts'>
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import Input from '@/shared/components/Input/Input.vue'
import { ref } from 'vue'
const value = ref('')

</script>
<template>
<div class="w-1/2 mx-auto mt-8">
    Default
    <Input id="default" name="InputDefault" label="Enter name" v-model='value' />
  </div>
</template>
```

Using type:

Default

```ts
<Input id="default" name="InputDefault" label="Enter name" v-model="value" />
```

Tel Number

```ts
<Input id="telid" name="InputTel" label="Enter Tel Number" type="tel" v-model="tel" />
```

Success

```ts
<Input id="success" name="InputSuccess" label="Enter name" :success="true" />
```

Password

```ts
<Input id="password" name="Inputpassword" label="Enter password" type="password" />
```

Error

```ts
<Input id="error" name="Inputerror" label="Enter name" :error="true" message="Error happened" />
```

Disabled

```ts
<Input id="disabled" name="Inputdisabled" label="Enter name" :disabled="true" />
```

Readonly

```ts
<Input id="readonly" name="Inputreadonly" label="Enter name" :readonly="true" />
```

Suffix icon

```ts
<Input
  id="suffix"
  name="Inputsuffix"
  label="Enter name"
  suffix="advertise"
  iconColor="text-success"
/>
```

Suffix Slot

```ts
<Input id="suffixslot" name="Inputsuffixslot" label="Enter name">
  <template #suffix>
    <BaseIcon name="archive" class="w-5 h-5 text-gray-dark" />
  </template>
</Input>
```

All in One

```ts
<script setup lang="ts">
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import Input from '@/shared/components/Input/Input.vue'
import { ref } from 'vue'
const tel = ref('')
</script>
<template>
  <div class="w-1/2 mx-auto mt-8">
    Default
    <Input id="default" name="InputDefault" label="Enter name" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    Tel Number
    <Input id="telid" name="InputTel" label="Enter Tel Number" type="tel" v-model="tel" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    Success
    <Input id="success" name="InputSuccess" label="Enter name" :success="true" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    password
    <Input id="password" name="Inputpassword" label="Enter password" type="password" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    error
    <Input id="error" name="Inputerror" label="Enter name" :error="true" message="Error happened" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    disabled
    <Input id="disabled" name="Inputdisabled" label="Enter name" :disabled="true" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    readonly
    <Input id="readonly" name="Inputreadonly" label="Enter name" :readonly="true" />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    suffix
    <Input
      id="suffix"
      name="Inputsuffix"
      label="Enter name"
      suffix="advertise"
      iconColor="text-success"
    />
  </div>
  <div class="w-1/2 mx-auto mt-8">
    suffix Slot
    <Input id="suffixslot" name="Inputsuffixslot" label="Enter name">
      <template #suffix>
        <BaseIcon name="archive" class="w-5 h-5 text-gray-dark" />
      </template>
    </Input>
  </div>
</template>

```
