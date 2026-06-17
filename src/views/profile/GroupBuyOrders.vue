<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { groupBuyList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const items = groupBuyList.slice(0, 1)
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我团购的产品" left-arrow @click-left="goBack" fixed placeholder />
    <van-cell v-for="item in items" :key="item.id" :title="item.title" :label="'¥' + item.price + ' · 已购买'" is-link @click="router.push('/group-buy/' + item.id)" />
    <div v-if="items.length === 0" class="empty-state">暂无团购订单</div>
  </div>
</template>
