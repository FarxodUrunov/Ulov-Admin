<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseModal from '@/shared/components/BaseModal/BaseModal.vue'
import { useTranslations } from '@/modules/companies/composables/useTranslations'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'
import BaseCheckbox from '@/shared/components/BaseCheckbox/BaseCheckbox.vue'
import BaseAlert from '@/shared/components/BaseAlert/BaseAlert.vue'
import TheReviewCard from '@/shared/components/TheReviewCard/TheReviewCard.vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['update:show'])

const { t } = useTranslations()

const selectAll = ref(false)
const selectedIds = ref(new Set())

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
const reviews = Array(5)
  .fill(review)
  .map((data, index) => ({ ...data, id: index + 1 }))

const showModal = computed({
  get: () => props.show,
  set: (value) => {
    emit('update:show', value)
  }
})

const indeterminate = computed(() => {
  if (reviews.length === selectedIds.value.size) {
    return false
  } else return selectedIds.value.size !== 0
})

const handleSelect = (data: any) => {
  if (selectedIds.value.has(data.id)) {
    selectedIds.value.delete(data.id)
  } else {
    if (data.id) {
      selectedIds.value.add(data.id)
    }
  }
  if (selectedIds.value.size === reviews.length) selectAll.value = true
  if (selectedIds.value.size === 0) {
    selectAll.value = false
  }
}

const handleSelectAll = (event: boolean) => {
  if (event) {
    const tempDataSource = reviews.filter((data) => data.id)

    if (tempDataSource.length) {
      selectedIds.value = new Set([...tempDataSource.map((data) => data.id)])
    }
  } else {
    selectedIds.value = new Set()
  }
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <BaseModal
    v-model="showModal"
    :header-text="t('editData')"
    size="lg"
    :cancel-text="t('buttons.cancel')"
    :confirm-text="t('buttons.save')"
    @cancel="closeModal"
  >
    <template #body>
      <h3 class="text-dark-light font-semibold text-lg">{{ t('menu.reviews') }}</h3>
      <template v-if="reviews.length">
        <div class="flex justify-between items-center my-4">
          <BaseCheckbox
            id="reviews"
            :model-value="selectAll"
            :indeterminate="indeterminate"
            :label="`${selectedIds.size}, выбрано`"
            @update:model-value="handleSelectAll"
          />
          <BaseButton link>{{ t('deleteAll') }}</BaseButton>
        </div>
        <div class="grid gap-5">
          <div v-for="review in reviews" :key="review.id" class="flex items-center gap-5">
            <BaseCheckbox
              id="reviews"
              :model-value="selectedIds.has(review.id)"
              @update:model-value="handleSelect(review)"
            />
            <TheReviewCard
              class="w-full"
              :fullName="review.fullName"
              :vehicleModel="review.vehicleModel"
              :description="review.description"
              :rating="review.rating"
              :date="review.date"
              :avatar="review.avatar"
            />
            <BaseButton
              variant="none"
              class="!min-h-0 !p-0 !rounded-md"
              :icon="{ name: 'deleteOutline', className: 'w-6 h-6 text-error' }"
              :has-default-slot="false"
            >
            </BaseButton>
          </div>
        </div>
      </template>
      <BaseAlert v-else :title="t('app.noDataFound')" type="error" />
    </template>
  </BaseModal>
</template>
