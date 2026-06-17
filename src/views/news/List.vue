<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { newsList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const list = ref(newsList)
const loading = ref(false)
const onRefresh = () => { loading.value = true; setTimeout(() => { loading.value = false }, 1000) }
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="最新资讯" left-arrow @click-left="goBack" fixed placeholder />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="true">
        <van-cell v-for="item in list" :key="item.id" @click="router.push('/news/' + item.id)" :border="false">
          <div class="news-item">
            <img :src="item.cover" class="news-thumb" />
            <div class="news-info">
              <div class="news-title">{{ item.title }}</div>
              <div class="news-desc">{{ item.summary }}</div>
              <div class="news-meta">{{ item.date }} · {{ item.author }} · {{ item.views }}阅读</div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.news-item { display: flex; gap: 12px; }
.news-thumb { width: 100px; height: 70px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.news-info { flex: 1; min-width: 0; }
.news-title { font-size: 15px; font-weight: 600; line-height: 1.4; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.news-desc { font-size: 12px; color: var(--text-light); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 6px; }
.news-meta { font-size: 11px; color: var(--text-lighter); }
</style>
