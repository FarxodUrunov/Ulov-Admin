<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseAddressPicker from '@/shared/components/BaseAddressPicker/BaseAddressPicker.vue'
import type { AddressValue } from '@/shared/components/BaseAddressPicker/types'

const props = defineProps<{
  modelValue: any
  id: string
  name: string
  label: string
  message?: string
  success?: boolean
  error?: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)
const address = ref<AddressValue | null>(null)

const addressValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleAddressPickerOpen = () => {
  showModal.value = true
  ;(document.querySelector(`#${props.id}`) as HTMLInputElement | null)?.blur()
}

const handleAddressPickerClose = () => {
  addressValue.value = address.value
  showModal.value = false
}
</script>

<template>
  <BaseInput
    :id="id"
    :model-value="addressValue?.address"
    :name="name"
    :label="label"
    class="read-only:cursor-pointer"
    label-variant="!cursor-pointer"
    suffix="locationOutline"
    icon-color="text-primary"
    :message="message"
    :success="success"
    :error="error"
    readonly
    @click="handleAddressPickerOpen"
  />
  <BaseModal
    v-model="showModal"
    header-text="Pick an address"
    size="full"
    model-variant="h-full bg-white rounded-xl"
    hide-footer
  >
    <template #body>
      <BaseAddressPicker v-model="address" @close="handleAddressPickerClose" />
    </template>
  </BaseModal>
</template>
