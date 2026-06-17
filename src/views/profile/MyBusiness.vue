<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { activityList, helpList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const activeTab = ref(0)

const businessList = activityList
const demandList = helpList
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我的商务" left-arrow @click-left="goBack" fixed placeholder />
    <van-tabs v-model:active="activeTab" sticky offset-top="46px">
      <van-tab :title="`我发起的商务 (${businessList.length})`">
        <van-cell
          v-for="item in businessList"
          :key="item.id"
          :title="item.title"
          :label="item.date + ' · ' + item.registered + '人参与'"
          is-link
          @click="router.push('/activity/' + item.id)"
        >
          <template #value><van-tag type="warning" size="small">商务活动</van-tag></template>
        </van-cell>
        <div v-if="businessList.length === 0" class="empty-state">暂无发起的商务</div>
      </van-tab>

      <van-tab :title="`我发布的需求 (${demandList.length})`">
        <van-cell
          v-for="item in demandList"
          :key="item.id"
          :title="item.title"
          :label="'状态：' + item.status + ' · ' + item.responseCount + '人响应'"
          is-link
          @click="router.push('/help/' + item.id)"
        >
          <template #value>
            <van-tag :type="item.status === '已解决' ? 'success' : 'warning'" size="small">{{ item.status }}</van-tag>
          </template>
        </van-cell>
        <div v-if="demandList.length === 0" class="empty-state">暂无发布的需求</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
