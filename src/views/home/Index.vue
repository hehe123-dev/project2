<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { banners, newsList, activityList, feedList, alumniList, companyList } from '@/mock/data'
import { useRole } from '@/composables/useRole'
import { useExchange } from '@/composables/useExchange'
import logoImg from '@/assets/logo.jpeg'

const router = useRouter()
const { currentRole, roleOptions, setRole } = useRole()
const { pendingCount } = useExchange()
const showRoleSwitch = ref(false)
const searchText = ref('')

const searchResults = computed(() => {
  const q = searchText.value.trim()
  if (!q) return []
  const results: { type: string; label: string; sub: string; route: string }[] = []
  newsList.filter(i => i.title.includes(q) || i.summary?.includes(q))
    .forEach(i => results.push({ type: '资讯', label: i.title, sub: i.date, route: '/news/' + i.id }))
  activityList.filter(i => i.title.includes(q) || i.location?.includes(q))
    .forEach(i => results.push({ type: '活动', label: i.title, sub: i.date + ' · ' + i.location, route: '/activity/' + i.id }))
  alumniList.filter(i => i.name.includes(q) || i.company?.includes(q) || i.school?.includes(q))
    .forEach(i => results.push({ type: '校友', label: i.name, sub: i.company + ' · ' + i.title, route: '/alumni-card/' + i.id }))
  companyList.filter(i => i.name.includes(q) || i.industry?.includes(q))
    .forEach(i => results.push({ type: '企业', label: i.name, sub: i.industry + ' · ' + i.address, route: '/member-company/' + i.id }))
  return results
})

const goResult = (route: string) => {
  searchText.value = ''
  router.push(route)
}

const alumniMenus = [
  { icon: 'friends-o', label: '校友名片', route: '/alumni-card', color: '#4a90d9', bg: '#ebf3fc' },
  { icon: 'cluster-o', label: '校友社团', route: '/alumni-group', color: '#67c23a', bg: '#edf7e6' },
  { icon: 'calendar-o', label: '校友活动', route: '/activity', color: '#e6a23c', bg: '#fdf6ec' },
  { icon: 'smile-comment-o', label: '校友互助', route: '/help', color: '#f56c6c', bg: '#fef0f0' }
]

const memberMenus = [
  { icon: 'idcard', label: '会员名片', route: '/member-card', color: '#8b5cf6', bg: '#f3f0ff' },
  { icon: 'shop-o', label: '会员企业', route: '/member-company', color: '#06b6d4', bg: '#ecfeff' },
  { icon: 'goods-collect-o', label: '会员产品', route: '/member-product', color: '#f97316', bg: '#fff7ed' },
  { icon: 'service-o', label: '会员服务', route: '/member-service', color: '#ec4899', bg: '#fdf2f8' }
]

const go = (path: string) => router.push(path)
</script>

<template>
  <div class="page-container">
    <!-- 头部 -->
    <div class="home-header">
      <div class="home-header-top">
        <div class="logo-area">
          <img :src="logoImg" class="logo" />
          <div>
            <div class="platform-name">白石桥七号</div>
            <div class="platform-sub">北理工校友商务平台</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px">
            <van-tag color="rgba(255,255,255,0.2)" text-color="#fff" size="small" @click="showRoleSwitch = true" style="cursor:pointer">
              {{ currentRole }} <van-icon name="arrow-down" size="10" />
            </van-tag>
            <van-badge :content="pendingCount" v-if="pendingCount > 0" max="9">
              <van-icon name="bell" size="22" color="#fff" @click="router.push('/profile')" />
            </van-badge>
            <van-icon v-else name="bell" size="22" color="#fff" @click="router.push('/profile')" />
          </div>
      </div>
      <!-- 搜索栏 -->
      <van-search v-model="searchText" shape="round" placeholder="搜索校友、企业、产品..." background="transparent" />
    </div>

    <!-- 搜索结果浮层 -->
    <div v-if="searchText.trim() && searchResults.length" class="search-results">
      <van-cell
        v-for="(item, i) in searchResults"
        :key="i"
        :title="item.label"
        :label="item.sub"
        @click="goResult(item.route)"
      >
        <template #icon>
          <van-tag :type="{ '资讯':'primary','活动':'warning','校友':'success','企业':'danger' }[item.type]" style="margin-right:8px;align-self:center">{{ item.type }}</van-tag>
        </template>
      </van-cell>
    </div>
    <div v-else-if="searchText.trim() && !searchResults.length" class="search-results">
      <van-empty description="未找到相关结果" image-size="60" />
    </div>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="#6fa4cf" style="margin: 0 12px; border-radius: 8px; overflow: hidden">
      <van-swipe-item v-for="item in banners" :key="item.id" @click="router.push('/news/' + item.id)">
        <img :src="item.image" style="width: 100%; height: 150px; object-fit: cover" />
      </van-swipe-item>
    </van-swipe>

    <!-- 平台标语 -->
    <div class="slogan-banner">
      <div class="slogan-text">同心共建，聚力赋能</div>
    </div>

    <!-- 校友功能按钮 -->
    <template v-if="currentRole !== '普通用户'">
      <div class="section-title">校友功能</div>
      <div class="menu-grid">
        <div v-for="m in alumniMenus" :key="m.label" class="menu-cell" @click="go(m.route)">
          <div class="menu-icon" :style="{ background: m.bg }">
            <van-icon :name="m.icon" size="22" :color="m.color" />
          </div>
          <span class="menu-label">{{ m.label }}</span>
        </div>
      </div>
    </template>

    <!-- 会员功能按钮 -->
    <template v-if="currentRole === '商务会员' || currentRole === '服务机构'">
      <div class="section-title">会员功能</div>
      <div class="menu-grid">
        <div v-for="m in memberMenus" :key="m.label" class="menu-cell" @click="go(m.route)">
          <div class="menu-icon" :style="{ background: m.bg }">
            <van-icon :name="m.icon" size="22" :color="m.color" />
          </div>
          <span class="menu-label">{{ m.label }}</span>
        </div>
      </div>
    </template>

    <!-- 最新资讯 -->
    <div class="section-title">
      <span>最新资讯</span>
      <span class="more" @click="go('/news')">查看更多 ></span>
    </div>
    <div class="card-list">
      <van-card
        v-for="item in newsList.slice(0, 3)"
        :key="item.id"
        :title="item.title"
        :desc="item.date + ' · ' + item.author"
        :thumb="item.cover"
        @click="router.push('/news/' + item.id)"
      />
    </div>

    <!-- 活动报名 -->
    <div class="section-title">
      <span>活动报名</span>
      <span class="more" @click="go('/activity')">查看更多 ></span>
    </div>
    <div class="card-list">
      <van-cell
        v-for="item in activityList"
        :key="item.id"
        @click="router.push('/activity/' + item.id)"
      >
        <template #title>
          <span class="activity-title">{{ item.title }}</span>
          <van-tag :type="item.status === '报名中' ? 'danger' : 'default'" size="small" style="margin-left: 8px">{{ item.status }}</van-tag>
        </template>
        <template #label>
          <div>{{ item.date }} · {{ item.location }} | {{ item.organizer }}</div>
        </template>
        <template #icon>
          <img :src="item.cover" style="width: 80px; height: 50px; border-radius: 4px; object-fit: cover; margin-right: 12px" />
        </template>
      </van-cell>
    </div>

    <!-- 主题分享 -->
    <div class="section-title">
      <span>主题分享</span>
      <span class="more" @click="go('/topic-share')">查看更多 ></span>
    </div>
    <div class="card-list">
      <van-card
        v-for="item in newsList.slice(0, 2)"
        :key="'t' + item.id"
        :title="item.title"
        :desc="item.date + ' · ' + item.author"
        :thumb="item.cover"
        @click="router.push('/topic-share/' + item.id)"
      />
    </div>

    <!-- 会员专访 -->
    <div class="section-title">
      <span>会员专访</span>
      <span class="more" @click="go('/interview')">查看更多 ></span>
    </div>
    <div class="card-list">
      <van-card
        v-for="item in newsList.slice(1, 3)"
        :key="'i' + item.id"
        :title="item.title"
        :desc="item.date + ' · ' + item.author"
        :thumb="item.cover"
        @click="router.push('/interview/' + item.id)"
      />
    </div>

    <!-- 校友动态 -->
    <div class="section-title">
      <span>校友动态</span>
      <span class="more" @click="go('/alumni-feed')">查看更多 ></span>
    </div>
    <div v-for="item in feedList" :key="item.id" class="feed-card" @click="router.push('/alumni-feed/' + item.id)">
      <div class="feed-header">
        <img :src="item.user.avatar" class="feed-avatar" />
        <div>
          <div class="feed-name">{{ item.user.name }}</div>
          <div class="feed-meta">{{ item.user.school }} · {{ item.user.year }} | {{ item.date }}</div>
        </div>
      </div>
      <div class="feed-content">{{ item.content }}</div>
      <div v-if="item.images.length" class="feed-images">
        <img v-for="(img, i) in item.images" :key="i" :src="img" class="feed-img" />
      </div>
      <div class="feed-actions">
        <span @click.stop><van-icon name="good-job-o" /> {{ item.likes }}</span>
        <span @click.stop><van-icon name="comment-o" /> {{ item.comments }}</span>
      </div>
    </div>

    <!-- 底部占位 -->
    <div style="height: 20px"></div>

    <!-- 角色切换弹窗 -->
    <van-popup v-model:show="showRoleSwitch" round position="bottom" :style="{ padding: '20px 0' }">
      <div style="text-align:center;font-size:16px;font-weight:600;margin-bottom:12px">切换演示角色</div>
      <div style="padding: 0 16px">
        <van-cell v-for="r in roleOptions" :key="r.value" :title="r.label" @click="setRole(r.value); showRoleSwitch = false">
          <template #right-icon>
            <van-icon v-if="currentRole === r.value" name="success" color="#1989fa" />
          </template>
        </van-cell>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
export default { name: 'HomePage' }
</script>

<style scoped>
.search-results {
  position: relative;
  z-index: 100;
  background: #fff;
  margin: 0 12px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  max-height: 60vh;
  overflow-y: auto;
}

.home-header {
  background: linear-gradient(135deg, #6fa4cf, #9bc1de);
  padding: 12px 16px 8px;
}
.home-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo {
  width: 36px; height: 36px; border-radius: 8px;
}
.platform-name { color: #fff; font-size: 18px; font-weight: 700; }
.platform-sub { color: rgba(255,255,255,0.7); font-size: 11px; }

.slogan-banner {
  margin: 12px 16px;
  padding: 24px;
  background: linear-gradient(135deg, #6fa4cf, #9bc1de);
  border-radius: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.slogan-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: shimmer 3s infinite;
}
@keyframes shimmer {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-10%, -10%); }
}
.slogan-text {
  position: relative;
  z-index: 1;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.activity-title { font-size: 14px; font-weight: 500; }

/* 功能菜单网格 */
.menu-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 0 12px 4px; }
.menu-cell { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 4px; cursor: pointer; }
.menu-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
.menu-cell:active .menu-icon { transform: scale(0.9); }
.menu-label { font-size: 12px; color: var(--text); }

.feed-card {
  margin: 0 12px 8px; padding: 14px; background: #fff; border-radius: 8px;
}
.feed-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.feed-avatar { width: 40px; height: 40px; border-radius: 50%; }
.feed-name { font-size: 15px; font-weight: 600; }
.feed-meta { font-size: 12px; color: var(--text-lighter); }
.feed-content { font-size: 14px; line-height: 1.6; margin-bottom: 10px; }
.feed-images { display: flex; gap: 6px; overflow-x: auto; margin-bottom: 10px; }
.feed-img { width: 100px; height: 100px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.feed-actions { display: flex; gap: 24px; color: var(--text-light); font-size: 13px; }
</style>
