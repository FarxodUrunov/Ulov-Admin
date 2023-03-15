<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import AuthCard from '../components/AuthCard.vue'
import ConfirmInput from '../components/ConfirmInput.vue'
import { useTranslations } from '../composables/useTranslations'
import { useConfirm } from '../composables/useConfirm'

const { t } = useTranslations()
const {
  disableConfirm,
  errorMessage,
  timerText,
  handleInput,
  handleConfirmSubmit,
  resendConfirmationCode
} = useConfirm()
</script>

<template>
  <AuthCard link-name="auth_reset_password" @submit.prevent="handleConfirmSubmit">
    <template #header>
      <div class="flex flex-col gap-2">
        <p class="text-xl test-dark text-center font-semibold">{{ t('confirmation') }}</p>
        <p class="text-sm text-dark-light font-normal text-center">
          {{ t('confirmationDescription') }} <span class="text-primary">+99890*****31</span>
        </p>
      </div>
    </template>
    <template #body>
      <div class="mb-2 flex justify-end">
        <p v-if="timerText" class="text-xs text-right text-dark-light">
          <!-- TODO: localize -->
          Вам отправили код <span class="text-primary">{{ timerText }} секунд</span>
        </p>
        <BaseButton v-else variant="none" @click="resendConfirmationCode">
          <p class="text-primary text-sm">{{ t('resendSMS') }}</p>
        </BaseButton>
      </div>

      <ConfirmInput :message="errorMessage" :error="!!errorMessage" @input="handleInput" />
    </template>
    <template #footer>
      <BaseButton
        size="sm"
        type="submit"
        class="w-full"
        :disabled="disableConfirm"
        data-test="confirm-submit-btn"
        @click="handleConfirmSubmit"
      >
        {{ t('buttons.confirm') }}
      </BaseButton>
    </template>
  </AuthCard>
</template>
