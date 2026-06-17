<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { productList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(productList.find(p => p.id === Number(route.params.id)) || productList[0])
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="产品详情" left-arrow @click-left="goBack" fixed placeholder />
    <img :src="item.cover" style="width:100%;height:200px;object-fit:cover" />
    <div style="padding: 16px">
      <div style="font-size:18px;font-weight:700;margin-bottom:8px">{{ item.name }}</div>
      <div style="font-size:13px;color:var(--primary);margin-bottom:4px">{{ item.company }}</div>
      <van-tag plain type="primary" size="small">{{ item.industry }}</van-tag>
      <div class="section-label">产品简介</div>
      <div class="intro-block">{{ item.intro }}</div>
      <div class="section-label">核心功能</div>
      <div class="intro-block">
        <van-tag v-for="f in item.features" :key="f" plain size="medium" style="margin: 0 6px 6px 0" type="success">{{ f }}</van-tag>
      </div>
      <div class="section-label">应用领域</div>
      <div class="intro-block">{{ item.applications }}</div>
    </div>
  </div>
</template>

<style scoped>
.section-label { font-size: 14px; font-weight: 600; padding: 16px 8px 8px; }
.intro-block { background: #fff; border-radius: 8px; padding: 12px; font-size: 14px; line-height: 1.8; }
</style>
