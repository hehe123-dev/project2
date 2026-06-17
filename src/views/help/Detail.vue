<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { helpList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(helpList.find(h => h.id === Number(route.params.id)) || helpList[0])
const showDialog = ref(false)
const responseText = ref('')

const submitResponse = () => {
  if (!responseText.value.trim()) return
  if (!item.value.responses) item.value.responses = []
  item.value.responses.push({ name: '我', avatar: 'https://picsum.photos/seed/me/100/100', text: responseText.value, time: '刚刚' })
  item.value.responseCount = item.value.responses.length
  responseText.value = ''
  showDialog.value = false
  showToast('评论已发送')
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="求助详情" left-arrow @click-left="goBack" fixed placeholder />
    <div class="help-detail">
      <div class="hd-header">
        <img :src="item.publisher.avatar" class="hd-avatar" />
        <div>
          <div class="hd-name">{{ item.publisher.name }}</div>
          <div class="hd-date">{{ item.date }}</div>
        </div>
        <van-tag :type="item.status === '已解决' ? 'success' : 'warning'">{{ item.status }}</van-tag>
      </div>
      <div class="hd-title">{{ item.title }}</div>
      <div class="hd-desc">{{ item.description }}</div>
    </div>

    <div class="section-title">评论</div>
    <div v-for="(r, i) in (item.responses || [])" :key="i" class="response-item">
      <div class="ri-header">
        <img :src="r.avatar" class="ri-avatar" />
        <div>
          <div class="ri-name">{{ r.name }}</div>
          <div class="ri-time">{{ r.time }}</div>
        </div>
      </div>
      <div class="ri-text">{{ r.text }}</div>
    </div>

    <!-- 底部评论按钮 -->
    <div class="comment-bar">
      <van-button type="primary" block round @click="showDialog = true" color="linear-gradient(135deg, #6fa4cf, #9bc1de)">评论</van-button>
    </div>

    <van-dialog v-model:show="showDialog" title="发表评论" show-cancel-button @confirm="submitResponse">
      <van-field v-model="responseText" type="textarea" rows="3" placeholder="写下你的评论..." style="padding: 16px" />
    </van-dialog>
  </div>
</template>

<style scoped>
.help-detail { padding: 16px; background: #fff; margin-bottom: 12px; }
.hd-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.hd-avatar { width: 44px; height: 44px; border-radius: 50%; }
.hd-name { font-size: 15px; font-weight: 600; }
.hd-date { font-size: 12px; color: var(--text-lighter); }
.hd-title { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.hd-desc { font-size: 14px; line-height: 1.8; color: var(--text); }
.response-item { padding: 12px 16px; background: #fff; border-bottom: 1px solid var(--border); }
.ri-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.ri-avatar { width: 32px; height: 32px; border-radius: 50%; }
.ri-name { font-size: 13px; font-weight: 600; }
.ri-time { font-size: 11px; color: var(--text-lighter); }
.ri-text { font-size: 14px; line-height: 1.6; }
.comment-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  padding: 10px 16px;
  background: #fff;
  border-top: 1px solid var(--border);
  z-index: 10;
}
.page-container { padding-bottom: 80px; }
</style>
