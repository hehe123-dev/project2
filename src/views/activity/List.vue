<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { activityList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const loading = ref(false)
const onRefresh = () => { loading.value = true; setTimeout(() => { loading.value = false }, 1000) }
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="校友活动" left-arrow @click-left="goBack" fixed placeholder />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-list v-model:loading="loading" :finished="true">
        <van-cell v-for="item in activityList" :key="item.id" @click="router.push('/activity/' + item.id)" :border="false">
          <div class="act-item">
            <img :src="item.cover" class="act-cover" />
            <div class="act-info">
              <div class="act-title">{{ item.title }}</div>
              <div class="act-meta">
                <van-icon name="clock-o" size="12" /> {{ item.date }}
              </div>
              <div class="act-meta">
                <van-icon name="location-o" size="12" /> {{ item.location }}
              </div>
              <div class="act-bottom">
                <van-tag :type="item.status === '报名中' ? 'danger' : 'default'" size="mini">{{ item.status }}</van-tag>
                <span>{{ item.registered }}人</span>
                <span style="margin-left: auto">{{ item.fee === 0 ? '免费' : '¥' + item.fee }}</span>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <div class="publish-btn">
      <van-button type="primary" block round @click="router.push('/publish-activity')" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">发布校友活动</van-button>
    </div>
  </div>
</template>

<style scoped>
.act-item { display: flex; gap: 12px; }
.act-cover { width: 110px; height: 80px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.act-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.act-title { font-size: 15px; font-weight: 600; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.act-meta { font-size: 12px; color: var(--text-light); display: flex; align-items: center; gap: 4px; }
.act-bottom { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-lighter); margin-top: auto; }
.publish-btn { padding: 16px; }
</style>
