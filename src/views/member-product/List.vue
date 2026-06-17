<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { productList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="会员产品" left-arrow @click-left="goBack" fixed placeholder />
    <van-search shape="round" placeholder="搜索产品..." />
    <div class="card-list">
      <van-cell v-for="item in productList" :key="item.id" @click="router.push('/member-product/' + item.id)" :border="false">
        <div class="prod-item">
          <img :src="item.cover" class="prod-cover" />
          <div class="prod-info">
            <div class="prod-name">{{ item.name }}</div>
            <div class="prod-company">{{ item.company }}</div>
            <van-tag plain size="mini" type="primary">{{ item.industry }}</van-tag>
          </div>
          <van-icon name="arrow" color="#ccc" />
        </div>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.prod-item { display: flex; align-items: center; gap: 12px; width: 100%; }
.prod-cover { width: 60px; height: 60px; border-radius: 8px; flex-shrink: 0; object-fit: cover; }
.prod-info { flex: 1; min-width: 0; }
.prod-name { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
.prod-company { font-size: 12px; color: var(--text-light); margin-bottom: 4px; }
</style>
