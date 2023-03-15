Auto SVG-loader usage

From the name prop of the BaseIcon component, you give the name of the svg component and get the desired icon

It is not required to write the name prop.

You can also change the icon to your desired state in the BaseIcon component class.

```vue
<BaseIcon name="notification" class="w-10 h-10 text-red-400" />
<BaseIcon name="notificationOutline" class="w-5 h-5 text-purple-500" />
```

SVG component names are written in camel-case - relative to svg files.
