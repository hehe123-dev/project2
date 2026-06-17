<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { feedList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(feedList.find(f => f.id === Number(route.params.id)) || feedList[0])
const liked = ref(item.value.liked)
const likes = ref(item.value.likes)
const commentText = ref('')
const comments = ref([
  { name: '王军', avatar: 'https://picsum.photos/seed/u3/100/100', text: '恭喜！创业不易，加油！', time: '2小时前' }
])

const toggleLike = () => {
  liked.value = !liked.value
  likes.value += liked.value ? 1 : -1
}

const addComment = () => {
  if (!commentText.value.trim()) return
  comments.value.push({ name: '我', avatar: 'https://picsum.photos/seed/me/100/100', text: commentText.value, time: '刚刚' })
  commentText.value = ''
  showToast('评论发送成功')
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="动态详情" left-arrow @click-left="goBack" fixed placeholder />
    <div class="feed-detail">
      <div class="fd-header">
        <img :src="item.user.avatar" class="fd-avatar" />
        <div class="fd-name">{{ item.user.name }}</div>
        <div class="fd-meta">{{ item.user.school }} · {{ item.user.year }} | {{ item.date }}</div>
      </div>
      <div class="fd-content">{{ item.content }}</div>
      <div v-if="item.images.length" class="fd-images">
        <img v-for="(img, i) in item.images" :key="i" :src="img" class="fd-img" />
      </div>
      <div class="fd-actions">
        <span @click="toggleLike" :style="{ color: liked ? '#ee0a24' : '' }">
          <van-icon :name="liked ? 'good-job' : 'good-job-o'" /> {{ likes }}
        </span>
        <span><van-icon name="comment-o" /> {{ item.comments }}</span>
      </div>
    </div>

    <div class="section-title">评论</div>
    <div v-for="(c, i) in comments" :key="i" class="comment-item">
      <img :src="c.avatar" class="cm-avatar" />
      <div>
        <div class="cm-name">{{ c.name }} <span class="cm-time">{{ c.time }}</span></div>
        <div class="cm-text">{{ c.text }}</div>
      </div>
    </div>

    <div class="comment-input">
      <van-field v-model="commentText" placeholder="写评论..." :border="false" />
      <van-button size="small" type="primary" round @click="addComment">发送</van-button>
    </div>
  </div>
</template>

<style scoped>
.feed-detail { padding: 16px; background: #fff; margin-bottom: 12px; }
.fd-header { margin-bottom: 12px; }
.fd-avatar { width: 44px; height: 44px; border-radius: 50%; margin-bottom: 6px; }
.fd-name { font-size: 16px; font-weight: 600; }
.fd-meta { font-size: 12px; color: var(--text-lighter); }
.fd-content { font-size: 15px; line-height: 1.8; margin-bottom: 12px; }
.fd-images { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.fd-img { width: calc(33.33% - 4px); border-radius: 6px; object-fit: cover; }
.fd-actions { display: flex; gap: 24px; color: var(--text-light); font-size: 14px; }
.comment-item { display: flex; gap: 10px; padding: 12px 16px; background: #fff; border-bottom: 1px solid var(--border); }
.cm-avatar { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; }
.cm-name { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
.cm-time { font-weight: 400; color: var(--text-lighter); font-size: 11px; margin-left: 8px; }
.cm-text { font-size: 14px; line-height: 1.5; }
.comment-input { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #fff; border-top: 1px solid var(--border); position: fixed; bottom: 0; left: 0; right: 0; }
</style>
