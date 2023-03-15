<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseSingleSelect from '@/shared/components/BaseSingleSelect/BaseSingleSelect.vue'
import BaseTextarea from '@/shared/components/BaseTextarea/BaseTextarea.vue'
import BaseRating from '@/shared/components/BaseRating/BaseRating.vue'

const mechanics = [
  { id: 1, name: 'Mechanic 1' },
  { id: 2, name: 'Mechanic 2' },
  { id: 3, name: 'Mechanic 3' }
]

const rateService = ref(0)
const rateMechanic = ref(0)
const mechanic = ref<number | undefined>(undefined)
const comment = ref('')

const handleSubmit = () => {
  const payload = {
    service_rating: rateService.value,
    mechanic_rating: rateMechanic.value,
    mechanic_id: mechanic.value,
    comment: comment.value
  }
  console.log(payload)
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <h4 class="text-lg font-semibold">Оставить отзыв на автосервиса</h4>
    <BaseRating v-model="rateService" size="md" label="Оцените автосервиса" />
    <BaseRating v-model="rateMechanic" size="md" label="Оцените специалиста" />
    <BaseSingleSelect
      id="mechanic"
      name="mechanic"
      v-model="mechanic"
      label="Выберите специалиста "
      :options="mechanics"
      :fieldNames="{ key: 'id', label: 'name' }"
    />
    <BaseTextarea v-model="comment" name="comment" placeholder="Оставить отзыв" />
    <BaseButton type="submit" class="w-full max-w-[200px]">Оставить отзыв</BaseButton>
  </form>
</template>
