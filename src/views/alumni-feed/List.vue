<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { feedList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const feeds = ref(feedList.map(f => ({ ...f })))

const toggleLike = (item: any) => {
  item.liked = !item.liked
  item.likes += item.liked ? 1 : -1
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="校友动态" left-arrow @click-left="goBack" fixed placeholder />
    <div v-for="item in feeds" :key="item.id" class="feed-card" style="margin-top: 8px">
      <div class="feed-header">
        <img :src="item.user.avatar" class="feed-avatar" />
        <div>
          <div class="feed-name">{{ item.user.name }}</div>
          <div class="feed-meta">{{ item.user.school }} · {{ item.user.year }} | {{ item.date }}</div>
        </div>
      </div>
      <div class="feed-content">{{ item.content }}</div>
      <div v-if="item.images.length" class="feed-images">
        <img v-for="(img, i) in item.images" :key="i" :src="img" class="feed-img" @click="showImagePreview({ images: item.images, startPosition: i })" />
      </div>
      <div class="feed-actions">
        <span @click="toggleLike(item)" :style="{ color: item.liked ? '#ee0a24' : '' }">
          <van-icon :name="item.liked ? 'good-job' : 'good-job-o'" /> {{ item.likes }}
        </span>
        <span><van-icon name="comment-o" /> {{ item.comments }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-card { margin: 0 12px 8px; padding: 14px; background: #fff; border-radius: 8px; }
.feed-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.feed-avatar { width: 40px; height: 40px; border-radius: 50%; }
.feed-name { font-size: 15px; font-weight: 600; }
.feed-meta { font-size: 11px; color: var(--text-lighter); }
.feed-content { font-size: 14px; line-height: 1.6; margin-bottom: 10px; }
.feed-images { display: flex; gap: 6px; overflow-x: auto; margin-bottom: 10px; }
.feed-img { width: 100px; height: 100px; border-radius: 6px; object-fit: cover; flex-shrink: 0; cursor: pointer; }
.feed-actions { display: flex; gap: 24px; color: var(--text-light); font-size: 13px; cursor: pointer; }
</style>
