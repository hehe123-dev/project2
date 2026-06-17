<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { groupList } from '@/mock/data'
import { useGroupJoin } from '@/composables/useGroupJoin'
import { showConfirmDialog, showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(groupList.find(g => g.id === Number(route.params.id)) || groupList[0])
const activeTab = ref(0)
const { isJoined, joinGroup, leaveGroup } = useGroupJoin()

const doJoin = () => {
  showConfirmDialog({ title: '申请加入', message: `确认申请加入「${item.value.name}」？` })
    .then(() => {
      joinGroup(item.value.id)
      showToast('申请已提交，等待社团管理员审核')
    })
}

const doLeave = () => {
  showConfirmDialog({ title: '退出社团', message: `确认退出「${item.value.name}」？` })
    .then(() => {
      leaveGroup(item.value.id)
      showToast('已退出该社团')
    })
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="社团详情" left-arrow @click-left="goBack" fixed placeholder />
    <div class="group-header">
      <img :src="item.logo" class="gh-logo" />
      <div class="gh-name">{{ item.name }}</div>
      <div class="gh-meta">{{ item.category }} · {{ item.memberCount }}人 · 负责人：{{ item.leader }}</div>
    </div>
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab title="社团简介">
        <div class="tab-content">
          <p>{{ item.intro }}</p>
        </div>
      </van-tab>
      <van-tab title="社团资讯">
        <div class="tab-content">
          <div v-if="item.news.length === 0" class="empty-state">暂无社团资讯</div>
          <van-cell v-for="n in item.news" :key="n.id" :title="n.title" is-link />
        </div>
      </van-tab>
      <van-tab title="社团活动">
        <div class="tab-content">
          <div v-if="item.activities.length === 0" class="empty-state">暂无社团活动</div>
          <van-cell v-for="a in item.activities" :key="a.id" :title="a.title" is-link />
        </div>
      </van-tab>
      <van-tab title="社团成员">
        <div class="tab-content">
          <div v-for="m in item.members" :key="m.name" class="member-item">
            <img :src="m.avatar" class="member-avatar" />
            <span>{{ m.name }}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 加入/退出按钮 -->
    <div class="join-bar">
      <van-button v-if="!isJoined(item.id)" type="primary" block round @click="doJoin" color="linear-gradient(135deg, #67c23a, #85ce61)">
        <van-icon name="plus" /> 申请加入
      </van-button>
      <van-button v-else plain block round type="danger" @click="doLeave">退出社团</van-button>
    </div>
  </div>
</template>

<style scoped>
.group-header { text-align: center; padding: 20px; background: #fff; }
.gh-logo { width: 64px; height: 64px; border-radius: 16px; margin-bottom: 10px; }
.gh-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
.gh-meta { font-size: 13px; color: var(--text-light); }
.tab-content { padding: 16px; font-size: 14px; line-height: 1.8; }
.member-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
.member-avatar { width: 40px; height: 40px; border-radius: 50%; }
.join-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: 10px 16px; background: #fff; border-top: 1px solid var(--border); z-index: 10; }
</style>
