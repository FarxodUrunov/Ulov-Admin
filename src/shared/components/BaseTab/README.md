### Using Tab component

## Tab component recieves one which is required and it is array of strings: tabs

- tabs - It contains of tab titles

### Example

```vue
<template>
  <BaseTab :tabs="tabs">
    <template #tab-1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deleniti harum iure
        laudantium modi, molestiae nesciunt omnis placeat sequi totam?
      </p>
    </template>
    <template #tab-2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deleniti harum iure
        laudantium modi, molestiae nesciunt omnis placeat sequi totam?
      </p>
    </template>
    <template #tab-3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deleniti harum iure
        laudantium modi, molestiae nesciunt omnis placeat sequi totam?
      </p>
    </template>
    <template #tab-4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci deleniti harum iure
        laudantium modi, molestiae nesciunt omnis placeat sequi totam?
      </p>
    </template>
  </BaseTab>
</template>
```
