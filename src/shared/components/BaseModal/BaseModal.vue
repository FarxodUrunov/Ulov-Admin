<script setup lang="ts">
import { computed } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseModalBackdrop from './components/BaseModalBackdrop.vue'
import type { ButtonVariant } from '@/shared/components/BaseButton/types'

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    size: 'md',
    headerText: 'Modal',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    cancelVariant: 'primary',
    confirmVariant: 'primary',
    centered: true
  }
)
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const modalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const modalSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'max-w-md'
    case 'sm':
      return 'max-w-md sm:max-w-lg'
    case 'md':
      return 'max-w-md sm:max-w-lg md:max-w-xl'
    case 'lg':
      return 'max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[800px]'
    case 'xl':
      return 'max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[800px] xl:max-w-6xl'
    default:
      return 'max-w-full'
  }
})

const modalCentered = computed(() => {
  return props.centered ? 'items-center' : 'items-start'
})

const modalPadding = computed(() => {
  const bodyPaddingTop = props.hideHeader ? 'pt-4 md:pt-6' : 'pt-2'
  const bodyPaddingBottom = props.hideFooter ? 'pb-4 md:pb-6' : 'pb-2'
  return {
    header: 'pt-4 pb-2 px-6',
    body: `${bodyPaddingTop} ${bodyPaddingBottom} px-4 md:px-6`,
    footer: 'py-4 px-6'
  }
})

const handleClose = () => {
  modalOpen.value = false
}

const handleStaticClose = () => {
  if (props.static) return
  handleClose()
}
</script>

<template>
  <TransitionRoot appear :show="modalOpen" as="template">
    <Dialog as="div" class="relative z-modal" @close="handleStaticClose">
      <BaseModalBackdrop />
      <div class="fixed inset-0">
        <div class="w-full h-full flex items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-100 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogPanel
              data-test="dialog-panel"
              class="flex align-middle h-[calc(100%-1rem)] w-full"
              :class="[modalSize, modalCentered]"
            >
              <div
                class="w-full max-h-full flex flex-col shadow-xl transition-all overflow-hidden"
                :class="[
                  modelVariant || 'bg-white rounded-xl',
                  headerCentered ? 'text-center' : ''
                ]"
              >
                <div
                  v-if="!hideHeader"
                  data-test="dialog-header"
                  class="shrink-0 flex items-center"
                  :class="headerVariant || modalPadding.header"
                >
                  <slot name="header">
                    <h3
                      class="flex-1 text-xl font-bold leading-8"
                      :class="{ 'mr-2': !hideCloseButton, 'ml-8': headerCentered }"
                    >
                      {{ headerText }}
                    </h3>
                    <BaseButton
                      v-if="!hideCloseButton"
                      data-test="dialog-close-button"
                      variant="none"
                      :icon="{ name: 'close', className: 'w-6 h-6 text-primary' }"
                      size="sm"
                      class="bg-gray-light hover:bg-gray w-8 h-8 !p-0 !min-h-0"
                      :has-default-slot="false"
                      @click="handleClose"
                    ></BaseButton>
                  </slot>
                </div>

                <div
                  data-test="dialog-body"
                  class="flex-1 overflow-auto"
                  :class="bodyVariant || modalPadding.body"
                >
                  <slot name="body" />
                </div>

                <div
                  v-if="!hideFooter"
                  data-test="dialog-footer"
                  class="shrink-0"
                  :class="footerVariant || modalPadding.footer"
                >
                  <slot name="footer">
                    <div class="flex flex-wrap justify-center items-center gap-5">
                      <BaseButton
                        data-test="cancel-button"
                        :variant="cancelVariant"
                        class="w-full max-w-[200px]"
                        :loading="cancelLoading"
                        outlined
                        @click="emit('cancel')"
                      >
                        {{ cancelText }}
                      </BaseButton>
                      <BaseButton
                        data-test="confirm-button"
                        :variant="confirmVariant"
                        class="w-full max-w-[200px]"
                        :loading="confirmLoading"
                        @click="emit('confirm')"
                      >
                        {{ confirmText }}
                      </BaseButton>
                    </div>
                  </slot>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
