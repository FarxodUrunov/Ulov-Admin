<script setup lang="ts">
import { onUnmounted, computed, ref } from 'vue'
import { YandexMap, YandexMarker } from '@/plugins/yandex-maps'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import { yMapSettings } from '@/shared/utils/constants'
import { useCachedUid } from '@/shared/composables/useCachedUid'
import type { AddressValue } from './types'

const props = defineProps<{
  modelValue: AddressValue | null
}>()
const emit = defineEmits(['update:modelValue', 'close'])

const mapVisible = ref(false)
const zoom = ref(15)
const showMarker = ref(true)
const { id } = useCachedUid('marker')

const addressValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const coordinates = computed(() => {
  return addressValue.value?.coords || [41.3120246552676, 69.21304655505367]
})

const onMapCreated = () => {
  mapVisible.value = true
}

const handleClick = async (event: any) => {
  /* eslint-disable no-undef */
  if (typeof event.get === 'function') {
    const coords = event.get('coords')
    const myGeocoder = await (ymaps as any).geocode(coords, { kind: 'house' })
    const myDistrict = await (ymaps as any).geocode(coords, { kind: 'district' })
    const myRegion = await (ymaps as any).geocode(coords, { kind: 'locality' })
    const myCountry = await (ymaps as any).geocode(coords, { results: 10 })
    const country = await myCountry.geoObjects.get(0).getCountry()
    const region = await myRegion.geoObjects.get(0).properties.get('name')
    const district = await myDistrict.geoObjects.get(0).properties.get('name')
    const address = await myGeocoder.geoObjects.get(0).properties.get('name')
    addressValue.value = { country, region, district, address, coords }
    showMarker.value = false
    zoom.value = 17
    setTimeout(() => {
      showMarker.value = true
    }, 10)
  }
  /* eslint-enable no-undef */
}

onUnmounted(() => {
  mapVisible.value = false
})
</script>

<template>
  <div class="w-full h-full m-auto">
    <yandex-map
      v-if="showMarker"
      class="w-full h-full overflow-hidden"
      :settings="yMapSettings"
      :zoom="zoom"
      :coordinates="coordinates"
      :controls="['zoomControl', 'typeSelector', 'searchControl', 'fullscreenControl']"
      :aria-visible="mapVisible"
      @created="onMapCreated"
      @click="handleClick"
    >
      <div
        v-if="addressValue"
        class="w-full max-w-sm fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-[1000]"
      >
        <div class="w-full bg-white text-sm text-dark shadow-2xl rounded-lg p-3 mb-8">
          {{ addressValue?.address }}
        </div>
        <BaseButton data-test="save-location-btn" class="w-full" @click="emit('close')">
          Сохранить
        </BaseButton>
      </div>
      <yandex-marker :marker-id="id" :coordinates="coordinates" />
    </yandex-map>
  </div>
</template>
