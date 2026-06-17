<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'
import { useGroupJoin } from '@/composables/useGroupJoin'
import { groupList } from '@/mock/data'
import { ref } from 'vue'

const router = useRouter()
const goBack = useGoBack()
const { joinedGroups, leaveGroup } = useGroupJoin()
const myGroups = ref(groupList.filter(g => joinedGroups.value.includes(g.id)))
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="我加入的社团" left-arrow @click-left="goBack" fixed placeholder />
    <div v-if="myGroups.length === 0" class="empty-state">暂未加入任何社团</div>
    <van-cell v-for="item in myGroups" :key="item.id" @click="router.push('/alumni-group/' + item.id)" :border="false">
      <div class="group-item">
        <img :src="item.logo" class="group-logo" />
        <div class="group-info">
          <div class="group-name">{{ item.name }}</div>
          <div class="group-meta">{{ item.category }} · {{ item.memberCount }}人</div>
        </div>
        <van-icon name="arrow" color="#ccc" />
      </div>
    </van-cell>
  </div>
</template>

<style scoped>
.group-item { display: flex; align-items: center; gap: 12px; width: 100%; }
.group-logo { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; }
.group-info { flex: 1; min-width: 0; }
.group-name { font-size: 15px; font-weight: 600; margin-bottom: 3px; }
.group-meta { font-size: 12px; color: var(--text-light); }
</style>
