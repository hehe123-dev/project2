<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { newsList, alumniList } from '@/mock/data'
import { useExchange } from '@/composables/useExchange'

const router = useRouter()
const goBack = useGoBack()
const { isFriend } = useExchange()
const friendList = computed(() => alumniList.filter(a => isFriend(a.id)))
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我的好友" left-arrow @click-left="goBack" fixed placeholder />
    <div v-if="friendList.length === 0" class="empty-state">暂无好友，去校友名片交换名片吧</div>
    <van-cell v-for="item in friendList" :key="item.id" :title="item.name" :label="item.school + ' · ' + item.major + ' · ' + item.year" is-link @click="router.push('/alumni-card/' + item.id)" />
  </div>
</template>
