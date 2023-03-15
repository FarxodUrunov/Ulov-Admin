<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseInput from '@/shared/components/BaseInput/BaseInput.vue'
import BaseCheckbox from '@/shared/components/BaseCheckbox/BaseCheckbox.vue'
import BaseFilterInput from '@/shared/components/BaseFilterInput/BaseFilterInput.vue'
import { useTranslations } from '@/modules/settings/composables/useTranslations'
import { useRoleForm } from '@/modules/settings/composables/useRoleForm'

const { t } = useTranslations()
const {
  permissionSearch,
  actions,
  permissions,
  role,
  description,
  handleActionChange,
  handlePermissionChange,
  handleRoleSubmit
} = useRoleForm()

const permissionsFiltered = computed(() => {
  return permissions.value.filter((permission) =>
    permission.name.toLowerCase().includes(permissionSearch.value.toLowerCase())
  )
})
</script>

<template>
  <form data-test="create-role-form" @submit.prevent="handleRoleSubmit">
    <h1 class="text-lg font-semibold text-dark-light">{{ t('addNewRole') }}</h1>
    <div class="grid grid-cols-3 gap-4 my-4">
      <BaseInput
        id="role"
        v-model="role.value.value"
        name="role"
        :label="t('form.userRole')"
        wrapper-variant="col-span-3 md:col-span-1"
        :success="role.meta.valid && role.meta.dirty"
        :error="!role.meta.valid && !!role.errorMessage.value"
        :message="role.errorMessage.value && t(role.errorMessage.value)"
      />
      <BaseInput
        id="description"
        v-model="description.value.value"
        name="description"
        :label="t('form.userRoleDescription')"
        wrapper-variant="col-span-3 md:col-span-2"
        :success="description.meta.valid && description.meta.dirty"
        :error="!description.meta.valid && !!description.errorMessage.value"
        :message="description.errorMessage.value && t(description.errorMessage.value)"
      />
    </div>

    <div class="flex flex-wrap items-center justify-between gap-2">
      <h1 class="text-lg font-semibold text-dark-light">{{ t('permissions') }}</h1>
      <BaseFilterInput
        id="permission-search"
        v-model="permissionSearch"
        name="permission-search"
        :place-holder="t('form.search')"
        class="hidden md:block"
        input-variant="border !border-solid !border-dark-lighter !bg-white"
        autocomplete="off"
        search
      />
    </div>

    <div class="overflow-x-auto py-2 mt-2 mb-4">
      <table data-test="permissions-table" class="w-full relative table-auto">
        <thead>
          <tr class="bg-gray-light font-semibold capitalize">
            <th class="text-start min-w-[200px] py-4 pl-4">{{ t('permissions') }}</th>
            <th
              v-for="(action, actionIndex) in actions"
              :key="action.id"
              class="w-[200px] py-3 px-5"
            >
              <BaseCheckbox
                :id="action.id"
                v-model="action.selected"
                :label="t(action.id)"
                :indeterminate="action.selected === 'indeterminate'"
                label-variant="text-dark-light !font-medium"
                @update:model-value="handleActionChange($event, actionIndex)"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="permissionsFiltered.length">
            <tr
              v-for="(permission, permissionIndex) in permissionsFiltered"
              :key="permissionIndex"
              class="bg-white border-b border-dark-lighter"
            >
              <td class="font-semibold text-dark text-start capitalize min-w-[200px] py-4 pl-4">
                {{ permission.name.replace('_', ' ') }}
              </td>
              <td
                v-for="(scope, scopeIndex) in permission.scopes"
                class="w-[200px] py-3 px-5"
                :key="scopeIndex"
              >
                <BaseCheckbox
                  :id="scope.name"
                  v-model="scope[scope.name]"
                  :data-test="scope.name"
                  @update:model-value="handlePermissionChange(scope.name, scopeIndex)"
                />
              </td>
            </tr>
          </template>
          <tr v-else>
            <td :colspan="actions.length + 1">
              <div class="w-full bg-white flex justify-center items-center text-center py-10 px-4">
                <h3>{{ t('NoPermissionsFound') }}</h3>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex flex-wrap justify-end items-center gap-4">
      <BaseButton class="w-full max-w-[200px]" outlined>{{ t('buttons.cancel') }}</BaseButton>
      <BaseButton type="submit" class="w-full max-w-[200px]">{{ t('addRole') }}</BaseButton>
    </div>
  </form>
</template>
