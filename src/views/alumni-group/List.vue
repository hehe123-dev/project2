<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { groupList } from '@/mock/data'

const router = useRouter()
const goBack = useGoBack()
const activeCategory = ref('全部')
const categories = ['全部', '行业社团', '兴趣社团', '地方社团', '海外社团']
const filteredList = ref(groupList)
const onCategoryChange = (cat: string) => {
  activeCategory.value = cat
  filteredList.value = cat === '全部' ? groupList : groupList.filter(g => g.category === cat)
}
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="校友社团" left-arrow @click-left="goBack" fixed placeholder />
    <van-tabs v-model:active="activeCategory" @click-tab="(t: any) => onCategoryChange(t.title)" sticky>
      <van-tab v-for="c in categories" :key="c" :title="c" />
    </van-tabs>
    <div class="card-list" style="margin-top: 8px">
      <div v-for="item in filteredList" :key="item.id" class="group-card" @click="router.push('/alumni-group/' + item.id)">
        <div class="group-top">
          <img :src="item.logo" class="group-logo" />
          <div class="group-info">
            <div class="group-name">{{ item.name }}</div>
            <div class="group-leader">负责人：{{ item.leader }}</div>
            <van-tag plain size="mini" type="primary">{{ item.category }}</van-tag>
            <span style="font-size:12px;color:var(--text-lighter);margin-left:8px">{{ item.memberCount }}人</span>
          </div>
        </div>
        <div class="group-desc">{{ item.intro }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group-card { background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 8px; }
.group-top { display: flex; gap: 12px; margin-bottom: 10px; }
.group-logo { width: 56px; height: 56px; border-radius: 12px; flex-shrink: 0; }
.group-info { flex: 1; }
.group-name { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
.group-leader { font-size: 12px; color: var(--text-light); margin-bottom: 4px; }
.group-desc { font-size: 13px; color: var(--text-light); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
</style>
