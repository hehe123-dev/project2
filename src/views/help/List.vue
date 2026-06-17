<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { helpList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="校友互助" left-arrow @click-left="goBack" fixed placeholder />
    <div class="card-list" style="margin-top: 8px">
      <div v-for="item in helpList" :key="item.id" class="help-card" @click="router.push('/help/' + item.id)">
        <div class="help-header">
          <img :src="item.publisher.avatar" class="help-avatar" />
          <div>
            <div class="help-publisher">{{ item.publisher.name }}</div>
            <div class="help-date">{{ item.date }}</div>
          </div>
          <van-tag :type="item.status === '已解决' ? 'success' : 'warning'" size="small">{{ item.status }}</van-tag>
        </div>
        <div class="help-title">{{ item.title }}</div>
        <div class="help-desc">{{ item.description }}</div>
        <div class="help-footer">
          <van-icon name="friends-o" /> {{ item.responseCount }}人响应
        </div>
      </div>
    </div>
    <div class="publish-btn">
      <van-button type="primary" block round @click="router.push('/publish-help')" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">发布求助信息</van-button>
    </div>
  </div>
</template>

<style scoped>
.help-card { background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 8px; }
.help-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.help-avatar { width: 36px; height: 36px; border-radius: 50%; }
.help-publisher { font-size: 14px; font-weight: 600; }
.help-date { font-size: 11px; color: var(--text-lighter); }
.help-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
.help-desc { font-size: 13px; color: var(--text-light); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 8px; }
.help-footer { font-size: 12px; color: var(--text-lighter); }
.publish-btn { padding: 16px; }
</style>
