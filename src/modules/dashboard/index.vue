<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from './stores/post'
import BaseButton from '@/shared/components/BaseButton/BaseButton.vue'

const postStore = usePostStore()
const { fetchPosts, createPost, fetchPost, updatePost, deletePost } = postStore
const { isLoading } = storeToRefs(postStore)

const handleFetchPosts = () => {
  fetchPosts()
}

const handleCreatePost = () => {
  createPost({
    title: 'foo',
    body: 'bar',
    userId: 1
  })
}

const handleFetchPost = () => {
  fetchPost(55)
}

const handleUpdatePost = () => {
  updatePost(55, {
    title: 'foo',
    userId: 1
  })
}

const handleDeletePost = () => {
  deletePost(55)
}

watch(isLoading, (value) => {
  console.log('isLoading', value)
})
</script>

<template>
  <div>
    <h1 class="mb-2">Dashboard</h1>
    <div class="flex gap-4 items-center">
      <BaseButton size="sm" @click="handleFetchPosts">Fetch posts</BaseButton>
      <BaseButton size="sm" @click="handleCreatePost">Create post</BaseButton>
      <BaseButton size="sm" @click="handleFetchPost">Fetch single post</BaseButton>
      <BaseButton size="sm" @click="handleUpdatePost">Update single post</BaseButton>
      <BaseButton size="sm" @click="handleDeletePost">Delete single post</BaseButton>
    </div>
  </div>
</template>
