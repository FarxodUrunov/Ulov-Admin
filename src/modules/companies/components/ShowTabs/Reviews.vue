<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseCard from '@/shared/components/BaseCard/BaseCard.vue'
import TheReviewCard from '@/shared/components/TheReviewCard/TheReviewCard.vue'
import TheRatingResults from '@/shared/components/TheRatingResults/TheRatingResults.vue'
import ReviewsDeleteModal from '@/modules/companies/components/ShowTabs/ReviewsDeleteModal.vue'
import ReviewForm from '@/modules/companies/components/ShowTabs/ReviewForm.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import type { CardActions } from '@/shared/components/BaseCard/types'

const { t } = useTranslations()

const showModal = ref(false)

const review = {
  fullName: 'Тошмат Эшматов',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet architecto, asperiores cumque debitis, delectus deleniti dicta eveniet ipsum iusto modi nihil officiis quae quisquam quod ratione suscipit velit? Alias aliquam animi aspernatur autem dolorem fugiat illum impedit, odio quam quis quo ratione repellat saepe sequi sint tempore temporibus voluptatum.',
  date: new Date(),
  rating: 4,
  vehicleModel: 'Chevrolet , Cobalt',
  avatar:
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'
}
const data = {
  total: 10,
  rating: 4,
  count: { excellent: 4, good: 0, normal: 0, bad: 6, worst: 0 }
}

const handleActions = (action: CardActions) => {
  if (action === 'edit') {
    showModal.value = true
  }
}
</script>

<template>
  <ReviewsDeleteModal v-model:show="showModal" />
  <BaseCard :actions="{ edit: true }" no-padding @actions="handleActions">
    <h3 class="text-xl font-bold text-dark mb-4">{{ t('menu.reviews') }}</h3>
    <div class="flex flex-col xl:flex-row gap-6 md:gap-8 xl:gap-12 2xl:gap-20">
      <div class="flex-1 flex flex-col order-2 xl:order-1">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-dark-light">{{ data.total }} {{ t('menu.reviews') }}</span>
          <BaseButton link>{{ t('showAll') }}</BaseButton>
        </div>
        <div class="grid gap-4">
          <TheReviewCard
            v-for="n in 5"
            :key="n"
            :fullName="review.fullName"
            :description="review.description"
            :rating="review.rating"
            :date="review.date"
            :vehicleModel="review.vehicleModel"
            :avatar="review.avatar"
          />
        </div>
      </div>
      <div class="order-1 xl:order-2">
        <TheRatingResults :rating="data" class="mb-6" />
        <ReviewForm />
      </div>
    </div>
  </BaseCard>
</template>
