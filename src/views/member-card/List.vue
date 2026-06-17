<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { memberList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="会员名片" left-arrow @click-left="goBack" fixed placeholder />
    <van-search shape="round" placeholder="搜索会员..." />
    <div class="card-list">
      <van-cell v-for="item in memberList" :key="item.id" @click="router.push('/member-card/' + item.id)" :border="false">
        <div class="member-item">
          <img :src="item.avatar" class="member-avatar" />
          <div class="member-info">
            <div class="member-name">{{ item.name }}</div>
            <div class="member-company">{{ item.company }} · {{ item.title }}</div>
            <div class="member-meta">{{ item.school }} · {{ item.year }} | {{ item.industry }}</div>
          </div>
          <van-icon name="arrow" color="#ccc" />
        </div>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.member-item { display: flex; align-items: center; gap: 12px; width: 100%; }
.member-avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
.member-info { flex: 1; min-width: 0; }
.member-name { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.member-company { font-size: 13px; color: var(--primary); margin-bottom: 2px; }
.member-meta { font-size: 12px; color: var(--text-lighter); }
</style>
