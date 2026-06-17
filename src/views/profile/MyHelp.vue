<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { helpList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const activeTab = ref(0)

const published = helpList
const responded = helpList.slice(0, 1)
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我的求助" left-arrow @click-left="goBack" fixed placeholder />
    <van-tabs v-model:active="activeTab" sticky offset-top="46px">
      <van-tab :title="`我发布的 (${published.length})`">
        <van-cell
          v-for="item in published"
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
        <div v-if="published.length === 0" class="empty-state">暂无发布的求助</div>
      </van-tab>

      <van-tab :title="`我响应的 (${responded.length})`">
        <van-cell
          v-for="item in responded"
          :key="item.id"
          :title="item.title"
          label="我的响应：可以提供相关资源对接"
          is-link
          @click="router.push('/help/' + item.id)"
        >
          <template #value><van-tag type="primary" size="small">已响应</van-tag></template>
        </van-cell>
        <div v-if="responded.length === 0" class="empty-state">暂无响应的求助</div>
      </van-tab>
    </van-tabs>
  </div>
</template>
