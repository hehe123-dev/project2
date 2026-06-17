<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { memberList } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(memberList.find(m => m.id === Number(route.params.id)) || memberList[0])
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="会员详情" left-arrow @click-left="goBack" fixed placeholder />
    <div style="padding: 16px">
      <div class="member-top">
        <img :src="item.avatar" class="mt-avatar" />
        <div class="mt-name">{{ item.name }}</div>
        <div class="mt-company">{{ item.company }} · {{ item.title }}</div>
        <van-tag type="warning" size="small">会员 · {{ item.memberSince }}加入</van-tag>
      </div>

      <van-cell-group inset style="margin-top:16px">
        <van-cell title="学校" :value="item.school" />
        <van-cell title="院系/入学年份" :value="item.year" />
        <van-cell title="城市" :value="item.city" />
        <van-cell title="行业" :value="item.industry" />
      </van-cell-group>

      <div class="section-label">个人简介</div>
      <div class="intro-block">{{ item.intro }}</div>

      <div class="section-label" v-if="item.companies.length">关联企业</div>
      <van-cell v-for="c in item.companies" :key="c.id" :title="c.name" is-link @click="router.push('/member-company/' + c.id)">
        <template #icon><img :src="c.logo" style="width:36px;height:36px;border-radius:8px;margin-right:10px" /></template>
      </van-cell>

      <div class="section-label" v-if="item.products.length">关联产品</div>
      <van-cell v-for="p in item.products" :key="p.id" :title="p.name" is-link @click="router.push('/member-product/' + p.id)">
        <template #icon><img :src="p.cover" style="width:36px;height:36px;border-radius:8px;margin-right:10px" /></template>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.member-top { text-align: center; padding: 16px 0; background: #fff; border-radius: 8px; }
.mt-avatar { width: 72px; height: 72px; border-radius: 50%; margin-bottom: 10px; }
.mt-name { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
.mt-company { font-size: 14px; color: var(--text-light); margin-bottom: 8px; }
.section-label { font-size: 14px; font-weight: 600; padding: 16px 8px 8px; }
.intro-block { background: #fff; border-radius: 8px; padding: 12px; font-size: 14px; line-height: 1.8; }
</style>
