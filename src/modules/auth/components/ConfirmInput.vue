<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import { isNumeric } from '@/shared/utils'

const props = defineProps<{
  clear?: boolean
  success?: boolean
  error?: boolean
  message?: string
}>()

const emits = defineEmits(['input'])

const inputLength = 6
const validationCode = ref<Array<any>>(new Array(inputLength).fill(undefined))

watch(
  () => props.clear,
  () => clearValue()
)

function clearValue() {
  if (props.clear) {
    validationCode.value = new Array(inputLength).fill(undefined)
  }
}

const handleInput = (event: any, inputIndex: number) => {
  const inputElements: any = document.querySelectorAll('#confirm')
  validationCode.value[inputIndex] = event.target.value[event.target.value.length - 1]
  if (event.target.value !== '') {
    if (inputIndex !== inputElements.length - 1) {
      inputElements[inputIndex + 1].focus()
    }
  }

  if (validationCode.value.length === inputLength) {
    emits('input', validationCode.value.join(''))
  }
}

const handleDelete = (event: any, inputIndex: number) => {
  if (event.key === '.') event.preventDefault()

  const inputElements: any = document.querySelectorAll('#confirm')
  if (inputIndex !== 0 && event.target.value === '' && event.keyCode === 8) {
    inputElements[inputIndex - 1].focus()
  }
}

const handleFocus = (inputIndex: number) => {
  const inputElements: any = document.querySelectorAll('#confirm')
  if (
    inputIndex &&
    !isNumeric(validationCode.value[inputIndex]) &&
    !isNumeric(validationCode.value[inputIndex - 1])
  ) {
    inputElements[inputIndex - 1].focus()
  }
}
</script>

<template>
  <div class="flex justify-between gap-3">
    <BaseInput
      v-for="n in inputLength"
      :key="n"
      name="confirm"
      id="confirm"
      v-model="validationCode[n - 1]"
      type="number"
      :error="error"
      center
      :disabled="!isNumeric(validationCode[n - 1]) && !isNumeric(validationCode[n - 2]) && n > 1"
      :data-test="n"
      @input="handleInput($event, n - 1)"
      @keydown="handleDelete($event, n - 1)"
      @focus="handleFocus(n - 1)"
    />
  </div>
  <p v-if="error" class="text-error text-xs font-normal mt-2">
    {{ message }}
  </p>
</template>
