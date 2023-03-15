<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import BaseUpload from '@/shared/components/BaseUpload/BaseUpload.vue'
import BaseDatepicker from '@/shared/components/BaseDatepicker/BaseDatepicker.vue'
import BaseAddressInput from '@/shared/components/BaseAddressInput/BaseAddressInput.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { useTranslations } from '../composables/useTranslations'
import { useProfileForm } from '../composables/useProfileForm'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()

const {
  photo,
  firstName,
  lastName,
  telNumber,
  dateOfBirth,
  address,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  statusList,
  roleList,
  roleId,
  status,
  handleShowPassword,
  handleShowConfirmPassword,
  handleGeneratePassword,
  handleFormReset,
  handleFormSubmit
} = useProfileForm()

const showModal = computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show', value)
    if (!value) handleFormReset()
  }
})
</script>

<template>
  <BaseModal
    v-model="showModal"
    :headerText="t('changeData')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.save')"
    @confirm="handleFormSubmit"
    @cancel="showModal = false"
  >
    <template #body>
      <BaseUpload
        v-model="photo.value.value"
        :accept="['png', 'jpg', 'jpeg', 'webp']"
        :description="t('uploadAvatar')"
        :success="photo.meta.valid && photo.meta.dirty"
        :error="!photo.meta.valid && !!photo.errorMessage.value"
        :message="photo.errorMessage.value && t(photo.errorMessage.value)"
      />
      <form
        data-test="profile-form"
        class="grid lg:grid-cols-2 items-start gap-6 mt-6"
        @submit.prevent="handleFormSubmit"
      >
        <BaseInput
          id="firstName"
          v-model="firstName.value.value"
          name="firstName"
          :label="t('form.firstName')"
          :success="firstName.meta.valid && firstName.meta.dirty"
          :error="!firstName.meta.valid && !!firstName.errorMessage.value"
          :message="firstName.errorMessage.value && t(firstName.errorMessage.value)"
        />
        <BaseInput
          id="lastName"
          v-model="lastName.value.value"
          name="lastName"
          :label="t('form.lastName')"
          :success="lastName.meta.valid && lastName.meta.dirty"
          :error="!lastName.meta.valid && !!lastName.errorMessage.value"
          :message="lastName.errorMessage.value && t(lastName.errorMessage.value)"
        />
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
        <BaseDatepicker
          id="datepicker"
          v-model="dateOfBirth.value.value"
          name="datepicker"
          :label="t('form.dateOfBirth')"
          auto-apply
          :success="dateOfBirth.meta.valid && dateOfBirth.meta.dirty"
          :error="!dateOfBirth.meta.valid && !!dateOfBirth.errorMessage.value"
          :message="dateOfBirth.errorMessage.value && t(dateOfBirth.errorMessage.value)"
        />
        <BaseAddressInput
          id="address"
          v-model="address.value.value"
          name="address"
          :label="t('form.address')"
          :success="address.meta.valid && address.meta.dirty"
          :error="!address.meta.valid && !!address.errorMessage.value"
          :message="address.errorMessage.value && t(address.errorMessage.value)"
        />
        <BaseInput
          id="passwordId"
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
              class="w-5 h-5 text-primary cursor-pointer"
              view-box="0 0 18 18"
              @click="handleShowPassword"
            />
          </template>
        </BaseInput>
        <BaseInput
          id="confirmpassword"
          v-model="confirmPassword.value.value"
          name="confirmpassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          :label="t('form.confirmPassword')"
          :success="confirmPassword.meta.valid && confirmPassword.meta.dirty"
          :error="!confirmPassword.meta.valid && !!confirmPassword.errorMessage.value"
          :message="confirmPassword.errorMessage.value && t(confirmPassword.errorMessage.value)"
        >
          <template #suffix>
            <BaseIcon
              :name="showConfirmPassword ? 'eyesCloseOutline' : 'eyesOpenOutline'"
              class="w-5 h-5 text-primary cursor-pointer"
              view-box="0 0 18 18"
              @click="handleShowConfirmPassword"
            />
          </template>
        </BaseInput>
        <BaseButton data-test="password-generate" outlined @click="handleGeneratePassword">
          {{ t('buttons.generatePassword') }}
        </BaseButton>
        <BaseSingleSelect
          id="select-status"
          v-model="status.value.value"
          name="select-status"
          :label="t('form.status')"
          :options="statusList"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="status.meta.valid && status.meta.dirty"
          :error="!status.meta.valid && !!status.errorMessage.value"
          :message="status.errorMessage.value && t(status.errorMessage.value)"
          data-test="select-status"
        />
        <BaseSingleSelect
          id="select-role"
          v-model="roleId.value.value"
          name="select-role"
          :label="t('form.userRole')"
          :options="roleList"
          :fieldNames="{ key: 'id', label: 'name' }"
          :success="roleId.meta.valid && roleId.meta.dirty"
          :error="!roleId.meta.valid && !!roleId.errorMessage.value"
          :message="roleId.errorMessage.value && t(roleId.errorMessage.value)"
          data-test="select-role"
        />
      </form>
    </template>
  </BaseModal>
</template>
