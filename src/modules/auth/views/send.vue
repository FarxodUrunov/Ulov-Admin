<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import AuthCard from '../components/AuthCard.vue'
import { useTranslations } from '../composables/useTranslations'
import { useSend } from '../composables/useSend'

const { t } = useTranslations()
const {
  showConfirmPassword,
  confirmPassword,
  password,
  showPassword,
  formMeta,
  handleShowPassword,
  handleShowConfirmPassword,
  handleFormSubmit
} = useSend()
</script>

<template>
  <AuthCard link-name="auth_confirm" @submit.prevent="handleFormSubmit">
    <template #header>
      <p class="text-xl test-dark text-center font-semibold">{{ t('enterNewPassword') }}</p>
    </template>
    <template #body>
      <div class="flex flex-col gap-7">
        <BaseInput
          id="newPassword"
          v-model="password.value.value"
          name="newPassword"
          :type="showPassword ? 'text' : 'password'"
          :label="t('form.newPassword')"
          :success="password.meta.valid && password.meta.dirty"
          :error="!password.meta.valid && !!password.errorMessage.value"
          :message="password.errorMessage.value && t(password.errorMessage.value)"
        >
          <template #suffix>
            <BaseIcon
              :name="showPassword ? 'eyesCloseOutline' : 'eyesOpenOutline'"
              class="w-4 h-4 text-primary cursor-pointer"
              view-box="0 0 18 18"
              @click="handleShowPassword"
            />
          </template>
        </BaseInput>
        <BaseInput
          id="confirmNewPassword"
          v-model="confirmPassword.value.value"
          name="confirmNewPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          :label="t('form.confirmNewPassword')"
          :success="confirmPassword.meta.valid && confirmPassword.meta.dirty"
          :error="!confirmPassword.meta.valid && !!confirmPassword.errorMessage.value"
          :message="confirmPassword.errorMessage.value && t(confirmPassword.errorMessage.value)"
        >
          <template #suffix>
            <BaseIcon
              :name="showConfirmPassword ? 'eyesCloseOutline' : 'eyesOpenOutline'"
              class="w-4 h-4 text-primary cursor-pointer"
              view-box="0 0 18 18"
              @click="handleShowConfirmPassword"
            />
          </template>
        </BaseInput>
      </div>
    </template>
    <template #footer>
      <BaseButton
        size="sm"
        type="submit"
        class="w-full mt-2"
        :disabled="!formMeta.valid"
        data-test="send-submit-btn"
        @click="handleFormSubmit"
      >
        {{ t('buttons.save') }}
      </BaseButton>
    </template>
  </AuthCard>
</template>
