<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  TrendCharts, View, Document, ChatDotRound, User,
  VideoCamera, ShoppingCart, Postcard, Money, ArrowRight,
  Flag, Headset, Calendar
} from '@element-plus/icons-vue'
import { groupList, activityList, helpList } from '@/mock/data'

const router = useRouter()

const stats = [
  { label: '今日访问', value: '2,341', diff: '+12.5%', diffPositive: true, color: '#4a90d9', icon: View },
  { label: '待审核认证', value: '5', diff: '+3', diffPositive: false, color: '#f56c6c', icon: Postcard },
  { label: '本月发布', value: '47', diff: '+8', diffPositive: true, color: '#67c23a', icon: Document },
  { label: '总用户数', value: '1,256', diff: '+24', diffPositive: true, color: '#e6a23c', icon: User }
]

const featureStats = computed(() => [
  {
    label: '社团总数',
    value: groupList.length,
    sub: `${groupList.reduce((s, g) => s + g.memberCount, 0).toLocaleString()} 名成员 · ${groupList.filter(g => g.category === '行业社团').length} 个行业社团`,
    color: '#67c23a',
    icon: Flag,
    route: '/admin/groups'
  },
  {
    label: '活动总数',
    value: activityList.length,
    sub: `报名中 ${activityList.filter(a => a.status === '报名中').length} 个 · ${activityList.reduce((s, a) => s + a.registered, 0)} 人次报名`,
    color: '#e6a23c',
    icon: Calendar,
    route: '/admin/activities'
  },
  {
    label: '求助总数',
    value: helpList.length,
    sub: `未解决 ${helpList.filter(h => h.status === '未解决').length} 条 · 已解决 ${helpList.filter(h => h.status === '已解决').length} 条`,
    color: '#06b6d4',
    icon: Headset,
    route: '/admin/help'
  }
])

const modules = [
  { key: 'news', label: '资讯管理', desc: '编辑发布资讯文章', icon: Document, color: '#4a90d9', bg: '#ebf3fc' },
  { key: 'topics', label: '主题分享', desc: '管理主题分享内容', icon: ChatDotRound, color: '#67c23a', bg: '#edf7e6' },
  { key: 'interviews', label: '会员专访', desc: '编辑专访稿件', icon: User, color: '#e6a23c', bg: '#fdf6ec' },
  { key: 'courses', label: '课程管理', desc: '管理在线课程', icon: VideoCamera, color: '#8b5cf6', bg: '#f3f0ff' },
  { key: 'groupbuy', label: '团购管理', desc: '管理团购商品', icon: ShoppingCart, color: '#f97316', bg: '#fff7ed' },
  { key: 'cert', label: '校友认证', desc: '审核校友认证申请', icon: Postcard, color: '#06b6d4', bg: '#ecfeff' },
  { key: 'recharge', label: '会员充值', desc: '会员充值订单管理', icon: Money, color: '#ec4899', bg: '#fdf2f8' },
  { key: 'groups', label: '社团管理', desc: '管理校友社团信息', icon: Flag, color: '#67c23a', bg: '#edf7e6' },
  { key: 'activities', label: '活动管理', desc: '管理校友活动', icon: Calendar, color: '#e6a23c', bg: '#fdf6ec' },
  { key: 'help', label: '校友互助', desc: '管理互助信息', icon: Headset, color: '#06b6d4', bg: '#ecfeff' }
]

const recentActivity = [
  { time: '14:45', user: '赵明辉', action: '创建社团《北理工智能驾驶俱乐部》', type: 'groups' },
  { time: '14:32', user: '张志强', action: '提交了校友认证申请', type: 'cert' },
  { time: '14:18', user: '系统', action: '资讯《北理工2026校友论坛》已发布', type: 'news' },
  { time: '13:55', user: '王军', action: '在互助平台发布《寻找自动驾驶人才》', type: 'help' },
  { time: '13:40', user: '运营管理员', action: '上架活动《校友企业投融资对接会》', type: 'activities' },
  { time: '13:12', user: '陈一鸣', action: '提交了校友认证申请', type: 'cert' },
  { time: '12:48', user: '系统', action: '课程《数字化转型实战》已发布', type: 'courses' }
]
</script>

<template>
  <div class="dashboard">
    <!-- 欢迎卡片 -->
    <div class="welcome-card">
      <div>
        <div class="welcome-title">欢迎回来，运营管理员 👋</div>
        <div class="welcome-sub">今天是 2026 年 6 月 16 日，平台运营状况良好</div>
      </div>
      <el-icon size="80" color="rgba(255,255,255,0.15)"><TrendCharts /></el-icon>
    </div>

    <!-- 数据看板 - 平台概况 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col v-for="s in stats" :key="s.label" :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-label">{{ s.label }}</div>
              <div class="stat-value" :style="{ color: s.color }">{{ s.value }}</div>
              <div class="stat-diff" :class="{ pos: s.diffPositive, neg: !s.diffPositive }">
                {{ s.diff }} 较昨日
              </div>
            </div>
            <div class="stat-icon" :style="{ background: s.color + '15', color: s.color }">
              <el-icon size="24"><component :is="s.icon" /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据看板 - 核心业务 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col v-for="s in featureStats" :key="s.label" :span="6">
        <el-card shadow="hover" class="feature-stat-card" @click="router.push(s.route)">
          <div class="feature-stat-content">
            <div class="feature-stat-icon" :style="{ background: s.color + '15', color: s.color }">
              <el-icon size="20"><component :is="s.icon" /></el-icon>
            </div>
            <div class="feature-stat-text">
              <div class="feature-stat-label">{{ s.label }}</div>
              <div class="feature-stat-value" :style="{ color: s.color }">{{ s.value }}</div>
              <div class="feature-stat-sub">{{ s.sub }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <!-- 管理模块 -->
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>管理功能</span>
              <span class="card-sub">{{ modules.length }} 个模块</span>
            </div>
          </template>
          <div class="module-grid">
            <div
              v-for="m in modules"
              :key="m.key"
              class="module-item"
              @click="router.push('/admin/' + m.key)"
            >
              <div class="module-icon" :style="{ background: m.bg, color: m.color }">
                <el-icon size="22"><component :is="m.icon" /></el-icon>
              </div>
              <div class="module-info">
                <div class="module-label">{{ m.label }}</div>
                <div class="module-desc">{{ m.desc }}</div>
              </div>
              <el-icon class="module-arrow"><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 最近动态 -->
      <el-col :span="8">
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近动态</span>
              <el-link type="primary" :underline="false">查看全部</el-link>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(item, i) in recentActivity"
              :key="i"
              :timestamp="item.time"
              :color="item.type === 'cert' ? '#06b6d4' : item.type === 'help' ? '#f56c6c' : item.type === 'groups' ? '#67c23a' : item.type === 'activities' ? '#e6a23c' : '#4a90d9'"
            >
              <span style="font-weight:600">{{ item.user }}</span> {{ item.action }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard { max-width: 1400px; margin: 0 auto; }

.welcome-card {
  background: linear-gradient(135deg, #1a3a5c 0%, #2a5a8c 100%);
  color: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(26,58,92,0.2);
}
.welcome-title { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
.welcome-sub { font-size: 13px; opacity: 0.85; }

.stat-card { border-radius: 8px; }
.stat-content { display: flex; justify-content: space-between; align-items: center; }
.stat-label { font-size: 13px; color: #909399; margin-bottom: 8px; }
.stat-value { font-size: 28px; font-weight: 700; line-height: 1.2; }
.stat-diff { font-size: 12px; margin-top: 6px; }
.stat-diff.pos { color: #67c23a; }
.stat-diff.neg { color: #f56c6c; }
.stat-icon {
  width: 56px; height: 56px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
}

.feature-stat-card { border-radius: 8px; cursor: pointer; transition: all 0.2s; }
.feature-stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.feature-stat-content { display: flex; align-items: center; gap: 14px; }
.feature-stat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.feature-stat-text { flex: 1; min-width: 0; }
.feature-stat-label { font-size: 12px; color: #909399; margin-bottom: 4px; }
.feature-stat-value { font-size: 22px; font-weight: 700; line-height: 1.2; }
.feature-stat-sub { font-size: 11px; color: #909399; margin-top: 4px; }

.card-header {
  display: flex; align-items: center; justify-content: space-between;
  font-weight: 600;
}
.card-sub { font-size: 12px; color: #909399; font-weight: 400; }

.module-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.module-item {
  display: flex; align-items: center; gap: 14px;
  padding: 16px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.module-item:hover {
  border-color: #4a90d9;
  background: #f5fafe;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74,144,217,0.15);
}
.module-item:hover .module-arrow { color: #4a90d9; transform: translateX(4px); }
.module-icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.module-info { flex: 1; min-width: 0; }
.module-label { font-size: 15px; font-weight: 600; color: #303133; margin-bottom: 2px; }
.module-desc { font-size: 12px; color: #909399; }
.module-arrow { color: #c0c4cc; transition: all 0.2s; }

.activity-card :deep(.el-timeline) { padding-left: 4px; }
.activity-card :deep(.el-timeline-item__content) { font-size: 13px; }
</style>
