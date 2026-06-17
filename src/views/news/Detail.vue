<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { newsList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(newsList.find(n => n.id === Number(route.params.id)) || newsList[0])
const liked = ref(false)
const collected = ref(false)

const toggleLike = () => { liked.value = !liked.value; showToast(liked.value ? '已点赞' : '已取消点赞') }
const toggleCollect = () => { collected.value = !collected.value; showToast(collected.value ? '已收藏' : '已取消收藏') }
const doShare = () => showToast('已复制分享链接')
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="资讯详情" left-arrow @click-left="goBack" fixed placeholder />
    <div class="content-detail">
      <h3>{{ item.title }}</h3>
      <div class="meta">
        <span>{{ item.author }}</span>
        <span>{{ item.date }}</span>
        <span>{{ item.views }}阅读</span>
      </div>
      <div class="body" v-html="item.content"></div>
    </div>
    <div class="detail-actions">
      <div class="action-item" @click="toggleLike" :class="{ active: liked }">
        <van-icon :name="liked ? 'good-job' : 'good-job-o'" size="20" /><span>{{ liked ? item.likes + 1 : item.likes }}</span>
      </div>
      <div class="action-item">
        <van-icon name="comment-o" size="20" /><span>{{ item.comments }}</span>
      </div>
      <div class="action-item" @click="toggleCollect" :class="{ active: collected }">
        <van-icon :name="collected ? 'star' : 'star-o'" size="20" /><span>收藏</span>
      </div>
      <div class="action-item" @click="doShare">
        <van-icon name="share-o" size="20" /><span>分享</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-actions {
  position: fixed; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around; padding: 10px 0;
  background: #fff; border-top: 1px solid var(--border);
}
.action-item { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 11px; color: var(--text-light); cursor: pointer; }
.action-item.active { color: var(--accent); }
</style>
