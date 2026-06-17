<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { alumniList } from '@/mock/data'
import { showConfirmDialog, showToast } from 'vant'
import { useExchange } from '@/composables/useExchange'

const router = useRouter()
const goBack = useGoBack()
const { hasSentRequest, sendRequest, isFriend } = useExchange()
const searchText = ref('')
const list = ref(alumniList.map(a => ({ ...a })))

const requestExchange = (item: any, event: Event) => {
  event.stopPropagation()
  showConfirmDialog({ title: '交换名片', message: `确认向${item.name}发送名片交换申请？` })
    .then(() => {
      sendRequest(item.id)
      showToast('申请已发送，等待对方确认')
    })
    .catch(() => {})
}


</script>

<template>
  <div class="page-container">
    <van-nav-bar title="校友名片" left-arrow @click-left="goBack" fixed placeholder />
    <van-search v-model="searchText" shape="round" placeholder="搜索校友姓名、行业、院系..." />
    <van-cell v-for="item in list" :key="item.id" @click="router.push('/alumni-card/' + item.id)" :border="false">
      <div class="alumni-item">
        <img :src="item.avatar" class="alumni-avatar" />
        <div class="alumni-info">
          <div class="alumni-name">
            {{ item.name }}
            <van-tag type="success" size="mini" v-if="isFriend(item.id)" style="margin-left: 4px">好友</van-tag>
            <van-tag color="#1989fa" text-color="#fff" size="mini" v-else-if="hasSentRequest(item.id)" style="margin-left: 4px">待确认</van-tag>
          </div>
          <div class="alumni-school">{{ item.school }} · {{ item.major }} · {{ item.year }}</div>
          <div class="alumni-tags">
            <van-tag v-for="t in item.tags" :key="t" plain size="mini" style="margin-right: 4px">{{ t }}</van-tag>
          </div>
        </div>
        <van-button
          v-if="!isFriend(item.id) && !hasSentRequest(item.id)"
          type="primary"
          size="small"
          round
          @click="requestExchange(item, $event)"
          style="flex-shrink: 0"
        >
          <van-icon name="exchange" size="14" /> 交换
        </van-button>
        <van-icon v-else name="arrow" size="16" color="#ccc" style="flex-shrink: 0" />
      </div>
    </van-cell>
  </div>
</template>

<style scoped>
.alumni-item { display: flex; align-items: center; gap: 12px; width: 100%; }
.alumni-avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
.alumni-info { flex: 1; min-width: 0; }
.alumni-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
.alumni-school { font-size: 13px; color: var(--text-light); margin-bottom: 4px; }
.alumni-tags { display: flex; flex-wrap: wrap; gap: 4px; }
</style>
