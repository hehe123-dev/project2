<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseList } from '@/mock/data'
import { useGoBack } from '@/composables/useGoBack'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const item = ref(courseList.find(c => c.id === Number(route.params.id)) || courseList[0])
const activeTab = ref(0)
const expandedChapters = ref<number[]>([1])

const totalLessons = computed(() => item.value.chapters.reduce((s, c) => s + c.lessons.length, 0))

const toggleChapter = (id: number) => {
  const idx = expandedChapters.value.indexOf(id)
  if (idx > -1) expandedChapters.value.splice(idx, 1)
  else expandedChapters.value.push(id)
}

const playLesson = (lesson: any) => {
  if (lesson.preview) {
    showToast('开始试看：' + lesson.title)
  } else {
    showConfirmDialog({ title: '订阅提示', message: '该课程需订阅后观看，是否立即订阅？' })
      .then(() => doBuy())
  }
}

const doBuy = () => {
  showConfirmDialog({
    title: '确认订阅',
    message: `课程：${item.value.title}\n价格：¥${item.value.price}\n\n订阅后可永久回看`
  }).then(() => showToast('订阅成功！开始学习吧'))
}

const onShare = () => showToast('已复制分享链接')
const collected = ref(false)
</script>

<template>
  <div class="page-container">
    <van-nav-bar title="课程详情" left-arrow @click-left="goBack" fixed placeholder>
      <template #right>
        <van-icon name="share-o" size="20" @click="onShare" />
      </template>
    </van-nav-bar>

    <!-- 课程封面 -->
    <div class="course-cover">
      <img :src="item.cover" />
    </div>

    <!-- 课程基本信息 -->
    <div class="course-info-section">
      <div class="course-tags">
        <van-tag v-for="t in item.tags" :key="t" type="danger" size="small" plain style="margin-right:6px">{{ t }}</van-tag>
      </div>
      <h2 class="course-title">{{ item.title }}</h2>
      <div class="course-subtitle">{{ item.subtitle }}</div>

      <div class="price-row">
        <span class="price-now">¥{{ item.price }}</span>
        <span class="price-orig">¥{{ item.originalPrice }}</span>
        <van-tag color="#6fa4cf" text-color="#fff" size="small" style="margin-left:auto">会员价 ¥{{ item.memberPrice }}</van-tag>
      </div>

      <div class="course-stats">
        <div class="stat">
          <van-icon name="play-circle-o" /> {{ totalLessons }}课时 · {{ item.duration }}
        </div>
        <div class="stat">
          <van-icon name="friends-o" /> {{ item.students.toLocaleString() }}人已学
        </div>
      </div>
    </div>

    <!-- 课程亮点 -->
    <div class="highlights-section">
      <div class="section-label">课程亮点</div>
      <div class="highlights-grid">
        <div v-for="h in item.highlights" :key="h" class="highlight-item">
          <van-icon name="success" color="#07c160" />
          <span>{{ h }}</span>
        </div>
      </div>
    </div>

    <!-- 选项卡 -->
    <van-tabs v-model:active="activeTab" sticky offset-top="46px">
      <!-- 课程介绍 -->
      <van-tab title="课程介绍">
        <div class="tab-content">
          <div class="intro-text">{{ item.intro }}</div>
          <img src="https://picsum.photos/seed/coursebanner/750/400" style="width:100%;border-radius:8px;margin-top:12px" />
          <div style="margin-top:16px;font-size:14px;line-height:1.8;color:var(--text)">
            <p>本课程精心设计，帮助学员系统掌握核心方法和实战技能。每节课配套讲义和案例，学完即可应用到实际工作中。</p>
            <p style="margin-top:8px">课程承诺：14天内不满意可申请退款，永久回看权限，专属学习社群答疑。</p>
          </div>
        </div>
      </van-tab>

      <!-- 课程目录 -->
      <van-tab :title="`目录 ${totalLessons}`">
        <div class="chapters">
          <div v-for="ch in item.chapters" :key="ch.id" class="chapter-block">
            <div class="chapter-header" @click="toggleChapter(ch.id)">
              <span class="chapter-title">{{ ch.title }}</span>
              <span class="chapter-meta">{{ ch.lessons.length }}节</span>
              <van-icon :name="expandedChapters.includes(ch.id) ? 'arrow-up' : 'arrow-down'" />
            </div>
            <div v-show="expandedChapters.includes(ch.id)" class="lesson-list">
              <div v-for="lesson in ch.lessons" :key="lesson.id" class="lesson-item" @click="playLesson(lesson)">
                <van-icon name="play-circle-o" :color="lesson.preview ? '#1989fa' : '#999'" size="18" />
                <span class="lesson-title" :style="{ color: lesson.preview ? 'var(--text)' : 'var(--text-light)' }">{{ lesson.title }}</span>
                <span class="lesson-duration">{{ lesson.duration }}</span>
                <van-tag v-if="lesson.preview" type="primary" size="mini" plain>试看</van-tag>
                <van-icon v-else name="lock" color="#ccc" size="14" />
              </div>
            </div>
          </div>
        </div>
      </van-tab>

      <!-- 讲师介绍 -->
      <van-tab title="讲师">
        <div class="teacher-section">
          <div class="teacher-card">
            <img :src="item.teacherAvatar" class="teacher-avatar" />
            <div class="teacher-info">
              <div class="teacher-name">{{ item.teacher }}</div>
              <div class="teacher-title">{{ item.teacherTitle }}</div>
            </div>
          </div>
          <div class="teacher-bio">{{ item.teacherBio }}</div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <div class="bb-action" @click="onShare">
        <van-icon name="share-o" size="20" />
        <span>分享</span>
      </div>
      <div class="bb-action" @click="collected = !collected" :class="{ active: collected }">
        <van-icon :name="collected ? 'star' : 'star-o'" size="20" />
        <span>收藏</span>
      </div>
      <div class="bb-action">
        <van-icon name="service-o" size="20" />
        <span>客服</span>
      </div>
      <van-button type="warning" size="large" @click="doBuy" class="buy-btn" round>
        <div style="display:flex;flex-direction:column;line-height:1.2">
          <span style="font-size:16px;font-weight:700">¥{{ item.price }}</span>
          <span style="font-size:10px">立即订阅</span>
        </div>
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.course-cover { width: 100%; aspect-ratio: 16/9; background: #000; }
.course-cover img { width: 100%; height: 100%; object-fit: cover; }

.course-info-section { padding: 14px 16px; background: #fff; }
.course-tags { margin-bottom: 8px; }
.course-title { font-size: 18px; font-weight: 700; line-height: 1.4; margin-bottom: 6px; }
.course-subtitle { font-size: 13px; color: var(--text-light); margin-bottom: 12px; }

.price-row { display: flex; align-items: baseline; gap: 8px; padding: 10px 12px; background: linear-gradient(90deg, #fff5e6, #fff); border-radius: 6px; margin-bottom: 10px; }
.price-now { font-size: 24px; font-weight: 700; color: #ee0a24; }
.price-orig { font-size: 13px; color: var(--text-lighter); text-decoration: line-through; }

.course-stats { display: flex; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--text-light); }
.stat { display: flex; align-items: center; gap: 4px; }

.highlights-section { background: #fff; margin-top: 8px; padding: 14px 16px; }
.section-label { font-size: 14px; font-weight: 600; margin-bottom: 10px; }
.highlights-grid { display: flex; flex-wrap: wrap; gap: 6px 12px; }
.highlight-item { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-light); width: calc(50% - 6px); }

.tab-content { padding: 16px; background: #fff; }
.intro-text { font-size: 14px; line-height: 1.8; color: var(--text); }

.chapters { background: #fff; }
.chapter-block { border-bottom: 1px solid var(--border); }
.chapter-header { display: flex; align-items: center; padding: 14px 16px; cursor: pointer; }
.chapter-title { flex: 1; font-size: 15px; font-weight: 600; }
.chapter-meta { font-size: 12px; color: var(--text-lighter); margin-right: 8px; }
.lesson-list { background: #fafafa; padding: 4px 0; }
.lesson-item { display: flex; align-items: center; gap: 8px; padding: 10px 16px 10px 32px; font-size: 13px; }
.lesson-title { flex: 1; }
.lesson-duration { font-size: 11px; color: var(--text-lighter); }

.teacher-section { padding: 16px; background: #fff; }
.teacher-card { display: flex; align-items: center; gap: 14px; }
.teacher-avatar { width: 64px; height: 64px; border-radius: 50%; }
.teacher-name { font-size: 17px; font-weight: 700; margin-bottom: 4px; }
.teacher-title { font-size: 12px; color: var(--text-light); }
.teacher-bio { margin-top: 14px; font-size: 14px; line-height: 1.8; color: var(--text); }

.bottom-bar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: #fff;
  border-top: 1px solid var(--border);
}
.bb-action { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 0 6px; font-size: 10px; color: var(--text-light); cursor: pointer; }
.bb-action.active { color: #ee0a24; }
.buy-btn { flex: 1; height: 44px; }
</style>
