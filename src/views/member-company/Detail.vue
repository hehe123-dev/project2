<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { companyList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(companyList.find(c => c.id === Number(route.params.id)) || companyList[0])
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="企业详情" left-arrow @click-left="goBack" fixed placeholder />
    <div style="padding: 16px">
      <div class="c-top">
        <img :src="item.logo" class="c-logo" />
        <div class="c-name">{{ item.name }}</div>
        <div class="c-meta">{{ item.industry }} · {{ item.address }}</div>
        <div class="c-founder">创始人：{{ item.founder }}</div>
      </div>
      <div class="section-label">企业简介</div>
      <div class="intro-block">{{ item.intro }}</div>
      <div class="section-label" v-if="item.products.length">产品列表</div>
      <div v-for="p in item.products" :key="p.id" class="prod-mini" @click="router.push('/member-product/' + p.id)">
        <img :src="p.cover" class="pm-cover" />
        <div>
          <div class="pm-name">{{ p.name }}</div>
          <div class="pm-desc">{{ p.intro }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-top { text-align: center; padding: 20px 0; background: #fff; border-radius: 8px; }
.c-logo { width: 64px; height: 64px; border-radius: 16px; margin-bottom: 10px; }
.c-name { font-size: 18px; font-weight: 700; margin-bottom: 4px; }
.c-meta { font-size: 13px; color: var(--text-light); margin-bottom: 2px; }
.c-founder { font-size: 13px; color: var(--text-light); }
.section-label { font-size: 14px; font-weight: 600; padding: 16px 8px 8px; }
.intro-block { background: #fff; border-radius: 8px; padding: 12px; font-size: 14px; line-height: 1.8; }
.prod-mini { display: flex; gap: 10px; padding: 10px; background: #fff; border-radius: 8px; margin-bottom: 6px; cursor: pointer; }
.pm-cover { width: 60px; height: 60px; border-radius: 8px; flex-shrink: 0; object-fit: cover; }
.pm-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.pm-desc { font-size: 12px; color: var(--text-light); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
