<script setup lang="ts">
import BaseStatisticsCard from '@/shared/components/BaseStatisticsCard/BaseStatisticsCard.vue'
import BaseChart from '@/shared/components/BaseChart/BaseChart.vue'
import TheTableHeader from '@/shared/components/TheTableHeader/TheTableHeader.vue'
import BaseMultiSelect from '@/shared/components/BaseMultiSelect/BaseMultiSelect.vue'
import { useTranslations } from '../composables/useTranslations'
import { useStatistics } from '../composables/useStatistics'

const { t } = useTranslations()

const {
  sortValue,
  appliedFilters,
  numberOfCars,
  numberItems,
  subscriptions,
  subscriptionItems,
  gender,
  genderItems,
  region,
  regionItems,
  data,
  dataChart,
  categories,
  handleFiltersApply,
  handleFilterDelete,
  handleFiltersReset,
  handleSelect,
  onClick
} = useStatistics()
</script>

<template>
  <div data-test="subscription-statistics-e2e">
    <h2 class="text-lg font-semibold text-dark-light">{{ t('menu.statistics') }}</h2>
    <div class="mt-4 mb-6">
      <TheTableHeader
        v-model:sort="sortValue"
        variant="statistics"
        :applied-filters="appliedFilters"
        @apply-filters="handleFiltersApply"
        @delete-filter="handleFilterDelete"
        @reset-filters="handleFiltersReset"
      >
        <div
          class="sm:grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 flex flex-col mx-auto gap-4"
        >
          <BaseMultiSelect
            v-model="numberOfCars"
            id="numberOfCars"
            name="numberOfCars"
            :label="t('numberOfCars')"
            :options="numberItems"
            :fieldNames="{ key: 'id', label: 'name' }"
            @select="(event) => handleSelect(event, 'numberOfCars')"
            mode="filter"
          />
          <BaseMultiSelect
            v-model="subscriptions"
            id="subscriptions"
            name="subscriptions"
            :label="t('menu.subscriptions')"
            :options="subscriptionItems"
            :fieldNames="{ key: 'id', label: 'name' }"
            @select="(event) => handleSelect(event, 'subscription')"
            mode="filter"
          />
          <BaseMultiSelect
            v-model="gender"
            id="genderId"
            name="gender"
            :label="t('form.gender')"
            :options="genderItems"
            :fieldNames="{ key: 'id', label: 'name' }"
            @select="(event) => handleSelect(event, 'gender')"
            mode="filter"
          />
          <BaseMultiSelect
            v-model="region"
            id="regionId"
            name="region"
            :label="t('form.region')"
            :options="regionItems"
            :fieldNames="{ key: 'id', label: 'name' }"
            @select="(event) => handleSelect(event, 'region')"
            mode="filter"
          />
        </div>
      </TheTableHeader>
    </div>
    <div class="grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 sm:gap-4 gap-2">
      <BaseStatisticsCard
        v-for="(item, i) in data"
        :key="item.id"
        :data-test="`statistics-card-${i + 1}`"
        :title="item.title"
        :staticsNumber="item.number"
        :staticsPercent="item.percent"
        :growthDescendStatus="item.status"
        :isActive="item.active"
        @click="onClick(item.id)"
      />
    </div>
    <div class="mt-6">
      <BaseChart
        :dataSeries="dataChart"
        :dataCategories="categories.map((item) => t(item))"
        colorLine="#04009a"
        bgColorLine="#21a2ff"
        height="350"
      />
    </div>
  </div>
</template>
