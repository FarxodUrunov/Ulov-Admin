<script setup lang="ts">
import { ref } from 'vue'
import PostModal from '../components/PostModal.vue'
import TheSectionInfo from '@/shared/components/TheSectionInfo/TheSectionInfo.vue'
import TheDeleteModal from '@/shared/components/TheDeleteModal/TheDeleteModal.vue'
import BaseList from '@/shared/components/BaseList/BaseList.vue'

const showPostModal = ref(false)
const showDeleteModal = ref(false)
const dataSource = [
  {
    id: 'phone',
    label: 'Номер телефона:',
    value: '+998901234567'
  },
  {
    id: 'dob',
    label: 'Дата рождения:',
    value: '19.02.2022'
  },
  {
    id: 'role',
    label: 'Роль ползователя:',
    value: 'Супер Админ'
  },
  {
    id: 'created_at',
    label: 'Дата регистрация:',
    value: '28.09.2022, 09:23'
  },
  {
    id: 'address',
    label: 'Адрес:',
    value: 'Г Ташкент, Shosh Avenue'
  },
  {
    id: 'status',
    label: 'Статус:',
    value: 'Актив'
  }
]

const handleEdit = () => {
  showPostModal.value = true
}

const handleDelete = () => {
  showDeleteModal.value = true
}
</script>

<template>
  <PostModal v-model:show="showPostModal" />
  <TheDeleteModal v-model="showDeleteModal" />

  <TheSectionInfo
    :image="{
      src: 'https://images.pexels.com/photos/13986931/pexels-photo-13986931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Service image',
      type: 'img',
      rounded: true
    }"
    :actions="{ edit: true, delete: true }"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <BaseList title="Усмонов Даврон" :data-source="dataSource">
      <template #address="{ value }">
        <span class="capitalize text-primary">{{ value }}</span>
      </template>
      <template #status="{ value }">
        <span class="capitalize text-white bg-success px-3 py-1 rounded">{{ value }}</span>
      </template>
    </BaseList>
  </TheSectionInfo>
</template>
