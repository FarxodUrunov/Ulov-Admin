<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import AuthCard from '../components/AuthCard.vue'
import { useTranslations } from '../composables/useTranslations'
import { useResetPassword } from '../composables/useResetPassword'

const { t } = useTranslations()
const { telNumber, formMeta, handleFormSubmit } = useResetPassword()
</script>

<template>
  <AuthCard link-name="auth_login" @submit.prevent="handleFormSubmit">
    <template #header>
      <div class="flex flex-col gap-2">
        <p class="text-xl test-dark text-center font-semibold">{{ t('passwordReset') }}</p>
        <p class="text-sm text-dark-light font-normal text-center">
          {{ t('passwordResetDescription') }}
        </p>
      </div>
    </template>
    <template #body>
      <BaseInput
        id="telNumber"
        v-model="telNumber.value.value"
        name="telNumber"
        type="tel"
        :label="t('form.phone')"
        :success="telNumber.meta.valid && telNumber.meta.dirty"
        :error="!telNumber.meta.valid && !!telNumber.errorMessage.value"
        :message="telNumber.errorMessage.value && t(telNumber.errorMessage.value)"
      />
    </template>
    <template #footer>
      <BaseButton
        type="submit"
        size="sm"
        class="w-full mt-2"
        :disabled="!formMeta.valid"
        data-test="reset-submit-btn"
        @click="handleFormSubmit"
      >
        {{ t('buttons.send') }}
      </BaseButton>
    </template>
  </AuthCard>
</template>
