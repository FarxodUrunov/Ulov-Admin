<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseDropdown from '@/shared/components/BaseDropdown/BaseDropdown.vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon/BaseIcon.vue'
import { setCurrentLocale } from '@/shared/utils/language'
import { localeOptions } from '@/shared/utils/constants'

type LocaleOption = (typeof localeOptions)[number]

const { locale } = useI18n()
const items = [(localeOptions as ReadonlyArray<any>).concat()]

const currentLocale = computed<LocaleOption['id']>(() => {
  return localeOptions.find((option) => option.id === locale.value)!.id
})

const handleClick = async (option: LocaleOption) => {
  setCurrentLocale(option.id)
  locale.value = option.id
}
</script>

<template>
  <BaseDropdown
    :items="items"
    strategy="absolute"
    placement="bottom"
    class="hidden sm:inline-flex"
    items-class="py-1 px-2"
  >
    <template #trigger>
      <span class="flex items-center capitalize bg-light rounded-md p-2">
        <BaseIcon :name="currentLocale" class="w-[27px] h-[20px]" view-box="0 0 640 480" />
        <span class="font-medium ml-3 mr-2">{{ currentLocale }}</span>
        <BaseIcon name="arrowBottom" class="w-5 h-5 text-gray-dark" />
      </span>
    </template>
    <template #item="{ item }: { item: LocaleOption }">
      <BaseButton
        class="w-full hover:bg-gray-light !min-h-0 !text-base !font-normal"
        variant="none"
        size="sm"
        :icon="{ name: item.id, className: 'w-[27px] h-[20px]', viewBox: '0 0 640 480' }"
        :centered="false"
        @click="handleClick(item)"
      >
        {{ item.name }}
      </BaseButton>
    </template>
  </BaseDropdown>
</template>
