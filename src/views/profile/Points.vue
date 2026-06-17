<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()
const records = [
  { desc: '完善会员资料', points: 50, date: '2026-06-10' },
  { desc: '发布商务活动', points: 30, date: '2026-06-08' },
  { desc: '发布主题分享', points: 20, date: '2026-06-05' },
  { desc: '响应校友求助', points: 15, date: '2026-06-01' },
  { desc: '邀请校友加入平台', points: 100, date: '2026-05-20' },
  { desc: '参加商务活动', points: 20, date: '2026-05-15' },
  { desc: '购买在线课程', points: 10, date: '2026-05-10' },
  { desc: '注册成为会员', points: 200, date: '2025-03-01' }
]
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我的贡献积分" left-arrow @click-left="goBack" fixed placeholder />
    <div class="points-header">
      <div class="points-num">1250</div>
      <div class="points-label">当前总积分</div>
    </div>
    <div class="section-title">积分明细</div>
    <van-cell v-for="(r, i) in records" :key="i" :title="r.desc" :value="'+' + r.points" :label="r.date">
      <template #value><span style="color:#07c160;font-weight:600">+{{ r.points }}</span></template>
    </van-cell>
  </div>
</template>

<style scoped>
.points-header { text-align: center; padding: 30px; background: #fff; margin: 8px 12px; border-radius: 8px; }
.points-num { font-size: 40px; font-weight: 700; color: #dabb6e; }
.points-label { font-size: 14px; color: var(--text-light); margin-top: 4px; }
</style>
