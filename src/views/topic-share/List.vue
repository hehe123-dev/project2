<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { topicList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="主题分享" left-arrow @click-left="goBack" fixed placeholder />
    <van-cell v-for="item in topicList" :key="item.id" @click="router.push('/topic-share/' + item.id)" :border="false">
      <div class="ts-item">
        <img :src="item.cover" class="ts-cover" />
        <div class="ts-info">
          <div class="ts-title">{{ item.title }}</div>
          <div class="ts-desc">{{ item.summary }}</div>
          <div class="ts-meta">{{ item.author }} · {{ item.date }} · {{ item.views }}阅读</div>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<style scoped>
.ts-item { display: flex; gap: 12px; }
.ts-cover { width: 100px; height: 70px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.ts-info { flex: 1; min-width: 0; }
.ts-title { font-size: 15px; font-weight: 600; line-height: 1.4; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.ts-desc { font-size: 12px; color: var(--text-light); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 6px; }
.ts-meta { font-size: 11px; color: var(--text-lighter); }
</style>
