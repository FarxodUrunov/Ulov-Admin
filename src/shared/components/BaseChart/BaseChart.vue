<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import defaultColors from '@/shared/utils/colors'
import regex from '@/shared/utils/regex'

const props = withDefaults(
  defineProps<{
    dataSeries: number[]
    dataCategories: string[]
    bgColorLine?: string
    colorLine?: string
    height?: string
  }>(),
  {
    bgColorLine: defaultColors.blue,
    colorLine: defaultColors.primary,
    height: '350'
  }
)

const series = computed(() => {
  return [
    {
      name: '',
      data: props.dataSeries
    }
  ]
})

const chartOptions = computed(() => {
  return {
    colors: [props.colorLine],
    chart: {
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    yaxis: {
      labels: {
        formatter: regex.formatNumber
      }
    },
    xaxis: {
      categories: props.dataCategories
    },
    legend: {
      show: false
    },
    fill: {
      colors: props.bgColorLine,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0.15,
        stops: [0, 75, 100],
        colorStops: []
      }
    }
  }
})
</script>
<template>
  <div data-info="chart" class="bg-white rounded-xl border border-gray-light p-1">
    <VueApexCharts :height="height" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>
