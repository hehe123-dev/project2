<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { courseList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const items = ref(courseList.slice(0, 2))
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我订阅的课程" left-arrow @click-left="goBack" fixed placeholder />
    <van-cell v-for="item in items" :key="item.id" :title="item.title" :label="item.teacher + ' · ' + item.duration" is-link @click="router.push('/courses/' + item.id)" />
    <div v-if="items.length === 0" class="empty-state">暂无订阅课程</div>
  </div>
</template>
