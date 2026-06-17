<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { activityList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const activeTab = ref(0)

// 演示数据：第一条作为我报名的，全部作为我发布的
const joined = activityList.slice(0, 1)
const published = activityList
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我的活动" left-arrow @click-left="goBack" fixed placeholder />
    <van-tabs v-model:active="activeTab" sticky offset-top="46px">
      <van-tab :title="`我报名的 (${joined.length})`">
        <van-cell
          v-for="item in joined"
          :key="item.id"
          :title="item.title"
          :label="item.date + ' · ' + item.location"
          is-link
          @click="router.push('/activity/' + item.id)"
        >
          <template #value><van-tag type="success" size="small">已报名</van-tag></template>
        </van-cell>
        <div v-if="joined.length === 0" class="empty-state">暂无报名的活动</div>
      </van-tab>

      <van-tab :title="`我发布的 (${published.length})`">
        <van-cell
          v-for="item in published"
          :key="item.id"
          :title="item.title"
          :label="item.date + ' · ' + item.registered + '人报名'"
          is-link
          @click="router.push('/activity/' + item.id)"
        >
          <template #value><van-tag type="primary" size="small">已发布</van-tag></template>
        </van-cell>
        <div v-if="published.length === 0" class="empty-state">暂无发布的活动</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
