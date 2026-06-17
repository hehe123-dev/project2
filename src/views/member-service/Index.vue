<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()

const categories = [
  { key: 'market', title: '市场推广', icon: 'chart-trending-o', desc: '供需匹配、渠道拓展、项目合作', color: '#1989fa' },
  { key: 'empower', title: '企业赋能', icon: 'gem-o', desc: '投融资、人才招聘、管理咨询、数字化建设等', color: '#07c160' },
  { key: 'biz-activity', title: '商务活动', icon: 'friends-o', desc: '主题沙龙、项目路演、供需交流、年度峰会等', color: '#ee0a24' },
  { key: 'exclusive', title: '专属服务', icon: 'vip-card-o', desc: '亲子教育、医疗保健、居家置业、出行礼遇等', color: '#ff976a' }
]
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="会员服务" left-arrow @click-left="goBack" fixed placeholder />
    <div style="padding: 16px">
      <div v-for="c in categories" :key="c.key" class="svc-card" @click="router.push('/member-service/' + c.key)">
        <div class="svc-icon" :style="{ background: c.color }">
          <van-icon :name="c.icon" size="24" color="#fff" />
        </div>
        <div class="svc-info">
          <div class="svc-title">{{ c.title }}</div>
          <div class="svc-desc">{{ c.desc }}</div>
        </div>
        <van-icon name="arrow" color="#ccc" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.svc-card { display: flex; align-items: center; gap: 14px; background: #fff; border-radius: 10px; padding: 16px; margin-bottom: 10px; }
.svc-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.svc-info { flex: 1; }
.svc-title { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.svc-desc { font-size: 12px; color: var(--text-light); }
</style>
