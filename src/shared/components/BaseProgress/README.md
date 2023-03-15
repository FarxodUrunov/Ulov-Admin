Using the BaseProgress component
You pass color, total, size, and current to the BaseProgress component through props.

It is not necessary to write the current, it is null by default.
It is not necessary to write size, it will be 'sm' by default.
It is not necessary to write color, it will be 'yellow' by default.
It is necessary to write the total

```vue
<BaseProgress class="mx-2" :current="7" color="primary" :total="10" size="lg" />
```
