<script setup lang="ts">
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseCheckbox from '@/shared/components/BaseCheckbox/BaseCheckbox.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import BaseLink from '@/shared/components/BaseLink/BaseLink.vue'
import AuthCard from '../components/AuthCard.vue'
import { useTranslations } from '../composables/useTranslations'
import { useLogin } from '../composables/useLogin'

const { t } = useTranslations()
const {
  loading,
  telNumber,
  password,
  rememberMe,
  showPassword,
  handleShowPassword,
  handleFormSubmit
} = useLogin()
</script>

<template>
  <AuthCard @submit.prevent="handleFormSubmit">
    <template #header>
      <p class="text-2xl test-dark text-center font-semibold">{{ t('login') }}</p>
    </template>
    <template #body>
      <div class="flex flex-col gap-7">
        <BaseInput
          id="telNumber"
          v-model="telNumber.value.value"
          name="telNumber"
          :label="t('form.phone')"
          type="tel"
          :success="telNumber.meta.valid && telNumber.meta.dirty"
          :error="!telNumber.meta.valid && !!telNumber.errorMessage.value"
          :message="telNumber.errorMessage.value && t(telNumber.errorMessage.value)"
        />
        <BaseInput
          id="password"
          v-model="password.value.value"
          name="password"
          :type="showPassword ? 'text' : 'password'"
          :label="t('form.password')"
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
        <div class="flex justify-between items-center">
          <BaseCheckbox
            id="rememberMe"
            v-model="rememberMe.value.value"
            :label="t('rememberMe')"
            label-variant="text-primary font-semibold"
          />
          <BaseLink :to="{ name: 'auth_reset_password' }" link data-test="login-link">
            {{ t('forgotPassword') }}
          </BaseLink>
        </div>
      </div>
    </template>
    <template #footer>
      <BaseButton
        size="sm"
        type="submit"
        class="w-full select-none"
        data-test="login-submit-btn"
        :loading="loading"
        @click="handleFormSubmit"
      >
        {{ t('login') }}
      </BaseButton>
    </template>
  </AuthCard>
</template>
