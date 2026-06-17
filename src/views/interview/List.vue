<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { interviewList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="会员专访" left-arrow @click-left="goBack" fixed placeholder />
    <van-cell v-for="item in interviewList" :key="item.id" @click="router.push('/interview/' + item.id)" :border="false">
      <div class="iv-item">
        <img :src="item.cover" class="iv-cover" />
        <div class="iv-info">
          <div class="iv-title">{{ item.title }}</div>
          <div class="iv-desc">{{ item.summary }}</div>
          <div class="iv-meta">{{ item.author }} · {{ item.date }} · {{ item.views }}阅读</div>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<style scoped>
.iv-item { display: flex; gap: 12px; }
.iv-cover { width: 100px; height: 70px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.iv-info { flex: 1; min-width: 0; }
.iv-title { font-size: 15px; font-weight: 600; line-height: 1.4; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.iv-desc { font-size: 12px; color: var(--text-light); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 6px; }
.iv-meta { font-size: 11px; color: var(--text-lighter); }
</style>
