<script setup lang="ts">
import { useRouter } from 'vue-router'
import { courseList } from '@/mock/data'
import { useGoBack } from '@/composables/useGoBack'

const router = useRouter()
const goBack = useGoBack()
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="在线课程" left-arrow @click-left="goBack" fixed placeholder />
    <div class="card-list" style="margin-top: 8px">
      <van-cell v-for="item in courseList" :key="item.id" @click="router.push('/courses/' + item.id)" :border="false">
        <div class="course-item">
          <img :src="item.cover" class="course-cover" />
          <div class="course-info">
            <div class="course-title">{{ item.title }}</div>
            <div class="course-teacher">{{ item.teacher }} · {{ item.duration }}</div>
            <div class="course-bottom">
              <span class="course-price">¥{{ item.price }}</span>
              <span class="course-original">¥{{ item.originalPrice }}</span>
              <span class="course-students">{{ item.students }}人已学</span>
            </div>
          </div>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<style scoped>
.course-item { display: flex; gap: 12px; }
.course-cover { width: 110px; height: 70px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.course-info { flex: 1; min-width: 0; }
.course-title { font-size: 14px; font-weight: 600; line-height: 1.4; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.course-teacher { font-size: 12px; color: var(--text-light); margin-bottom: 4px; }
.course-bottom { display: flex; align-items: center; gap: 6px; }
.course-price { font-size: 16px; font-weight: 700; color: #ee0a24; }
.course-original { font-size: 12px; color: var(--text-lighter); text-decoration: line-through; }
.course-students { font-size: 11px; color: var(--text-lighter); margin-left: auto; }
</style>
