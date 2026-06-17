<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { companyList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="会员企业" left-arrow @click-left="goBack" fixed placeholder />
    <van-search shape="round" placeholder="搜索企业..." />
    <div class="card-list">
      <van-cell v-for="item in companyList" :key="item.id" @click="router.push('/member-company/' + item.id)" :border="false">
        <div class="comp-item">
          <img :src="item.logo" class="comp-logo" />
          <div class="comp-info">
            <div class="comp-name">{{ item.name }}</div>
            <div class="comp-meta">{{ item.industry }} · {{ item.founder }}</div>
            <div class="comp-addr">{{ item.address }}</div>
          </div>
          <van-icon name="arrow" color="#ccc" />
        </div>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.comp-item { display: flex; align-items: center; gap: 12px; width: 100%; }
.comp-logo { width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0; }
.comp-info { flex: 1; min-width: 0; }
.comp-name { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
.comp-meta { font-size: 12px; color: var(--text-light); margin-bottom: 2px; }
.comp-addr { font-size: 11px; color: var(--text-lighter); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
