<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { feedList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我发布的动态" left-arrow @click-left="goBack" fixed placeholder />
    <div v-for="item in feedList" :key="item.id" class="feed-mini" @click="router.push('/alumni-feed/' + item.id)">
      <div class="fm-content">{{ item.content }}</div>
      <div class="fm-meta">{{ item.date }} · {{ item.likes }}赞 · {{ item.comments }}评论</div>
    </div>
  </div>
</template>

<style scoped>
.feed-mini { padding: 14px 16px; background: #fff; border-bottom: 1px solid var(--border); }
.fm-content { font-size: 14px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 6px; }
.fm-meta { font-size: 11px; color: var(--text-lighter); }
</style>
