<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { topicList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我分享的主题" left-arrow @click-left="goBack" fixed placeholder />
    <div style="padding: 16px">
      <van-button type="primary" block round @click="router.push('/publish-feed')" color="linear-gradient(135deg, #6fa4cf, #9bc1de)" style="margin-bottom: 12px">发布主题</van-button>
      <van-cell v-for="item in topicList" :key="item.id" :title="item.title" :label="item.date + ' · ' + item.views + '阅读 · ' + item.likes + '赞'" is-link @click="router.push('/topic-share/' + item.id)" />
    </div>
  </div>
</template>
