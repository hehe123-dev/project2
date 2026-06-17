<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { alumniList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(alumniList.find(a => a.id === Number(route.params.id)) || alumniList[0])
const exchangeRequested = ref(item.value.exchanged)

const requestExchange = () => {
  showConfirmDialog({ title: '交换名片', message: '确认向该校友发送名片交换申请？' })
    .then(() => { exchangeRequested.value = true; showToast('申请已发送，等待对方确认') })
    .catch(() => {})
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="校友详情" left-arrow @click-left="goBack" fixed placeholder />
    <div class="detail-card">
      <div class="profile-top">
        <img :src="item.avatar" class="profile-avatar" />
        <div class="profile-name">{{ item.name }}</div>
        <div class="profile-title" v-if="item.company">{{ item.company }} · {{ item.title }}</div>
      </div>
      <van-cell-group inset style="margin-top: 16px">
        <van-cell title="学校" :value="item.school" />
        <van-cell title="院系" :value="item.major" />
        <van-cell title="入学年份" :value="item.year" />
        <van-cell title="学历" :value="item.degree" />
        <van-cell title="所在城市" :value="item.city" />
        <van-cell title="行业" :value="item.industry" />
        <van-cell title="个人标签" v-if="item.exchanged || exchangeRequested">
          <template #value>
            <van-tag v-for="t in item.tags" :key="t" plain size="small" style="margin-right: 4px">{{ t }}</van-tag>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset style="margin-top: 12px">
        <van-cell title="手机" :value="item.exchanged || exchangeRequested ? item.phone : '交换名片后可见'" />
        <van-cell title="邮箱" :value="item.exchanged || exchangeRequested ? item.email : '交换名片后可见'" />
        <van-cell title="微信" :value="item.exchanged || exchangeRequested ? item.wechat : '交换名片后可见'" />
      </van-cell-group>

      <div class="intro-section">
        <div class="intro-title">个人简介</div>
        <div class="intro-body" v-if="item.exchanged || exchangeRequested">{{ item.intro }}</div>
        <div class="intro-body intro-locked" v-else>
          {{ item.intro ? item.intro.slice(0, 50) + '...' : '该校友暂未填写个人简介' }}
          <div class="intro-tips">交换名片后查看完整简介</div>
        </div>
      </div>

      <div style="padding: 24px 16px" v-if="!item.exchanged && !exchangeRequested">
        <van-button type="primary" block round @click="requestExchange" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">
          <van-icon name="exchange" /> 与Ta交换名片
        </van-button>
      </div>
      <div style="padding: 16px; text-align: center; color: var(--text-lighter); font-size: 12px" v-else-if="exchangeRequested && !item.exchanged">
        交换申请已发送，等待对方确认...
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-card { padding: 16px; }
.profile-top { text-align: center; padding: 20px 0; }
.profile-avatar { width: 72px; height: 72px; border-radius: 50%; margin-bottom: 12px; }
.profile-name { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.profile-title { font-size: 14px; color: var(--text-light); }
.intro-section { padding: 16px; margin-top: 12px; background: #fff; border-radius: 8px; }
.intro-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; }
.intro-body { font-size: 14px; line-height: 1.8; color: var(--text); }
.intro-locked { color: var(--text-light); }
.intro-tips { margin-top: 8px; font-size: 12px; color: var(--primary); }
</style>
