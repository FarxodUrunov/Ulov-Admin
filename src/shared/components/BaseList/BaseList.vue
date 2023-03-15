<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { DataSourceItem } from './types'

defineProps<{
  dataSource: DataSourceItem[]
  title?: string
}>()

const { t } = useI18n()

const addSemiColon = (value?: string) => {
  return value && !value.endsWith(':') ? ':' : ''
}
</script>

<template>
  <div class="w-full">
    <h3 v-if="title" data-test="header" class="text-lg md:text-xl font-semibold mb-1">
      {{ title }}
    </h3>
    <table class="hidden sm:table table-auto">
      <tbody>
        <tr v-for="dataSourceItem in dataSource" :key="dataSourceItem.id" class="align-top">
          <td data-test="key" class="text-dark-light pr-6 2xl:pr-8 py-1">
            {{ dataSourceItem.localizeLabel ? t(dataSourceItem.label) : dataSourceItem.label
            }}{{ addSemiColon(dataSourceItem.label) }}
          </td>
          <td data-test="value" class="py-1">
            <slot :name="dataSourceItem.id" :value="dataSourceItem.value">
              <span class="font-medium">{{ dataSourceItem.value }}</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <ul class="sm:hidden">
      <li
        v-for="dataSourceItem in dataSource"
        :key="dataSourceItem.id"
        class="flex flex-col items-start gap-1 mb-4 last:mb-0"
      >
        <span data-test="key" class="text-dark-light">
          {{ dataSourceItem.localizeLabel ? t(dataSourceItem.label) : dataSourceItem.label
          }}{{ addSemiColon(dataSourceItem.label) }}
        </span>
        <span data-test="value">
          <slot :name="dataSourceItem.id" :value="dataSourceItem.value">
            <span class="font-medium">{{ dataSourceItem.value }}</span>
          </slot>
        </span>
      </li>
    </ul>
  </div>
</template>
