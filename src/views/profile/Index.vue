<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { useRole } from '@/composables/useRole'
import { useExchange } from '@/composables/useExchange'
import { isLoggedIn } from '@/router'

const router = useRouter()
const { incomingRequests, pendingCount, friendCount, acceptRequest, rejectRequest } = useExchange()

const doLogout = () => {
  showConfirmDialog({ title: '退出登录', message: '确定要退出登录吗？' })
    .then(() => {
      isLoggedIn.value = false
      router.replace('/login')
    })
}

const doReset = () => {
  showConfirmDialog({ title: '重置演示数据', message: '将恢复所有数据到初始状态并返回登录页，确定继续？' })
    .then(() => {
      isLoggedIn.value = false
      router.replace('/login')
      setTimeout(() => window.location.reload(), 200)
    })
}
const { currentRole, roleOptions, setRole, roleMenus, showMemberPromo, showPoints } = useRole()
const showRolePicker = ref(false)

const isAlumni = computed(() => currentRole.value !== '普通用户')

const userBase = {
  name: '赵明辉',
  avatar: 'https://picsum.photos/seed/myavatar/200/200',
  school: '自动化学院',
  year: '2005级',
  location: '北京',
  tags: ['创业', '人工智能', '智能制造']
}

const quickStats = computed(() => isAlumni.value
  ? [
      { label: '好友', value: friendCount, route: '/profile/favorites' },
      { label: '动态', value: 42, route: '/profile/my-feed' },
      ...(showPoints.value ? [{ label: '积分', value: 1250, route: '/profile/points' }] : [])
    ]
  : [
      { label: '订单', value: 3, route: '/profile/group-buy' },
      { label: '收藏', value: 12, route: '/profile/favorites' },
      { label: '课程', value: 2, route: '/profile/subscribe' }
    ])

const serviceGrid = computed(() => isAlumni.value
  ? [
      { icon: 'vip-card', label: '会员认证', route: '/profile/member-edit', color: '#ff976a' },
      { icon: 'certificate', label: '校友认证', route: '/profile/edit', color: '#1989fa' },
      { icon: 'orders-o', label: '我的订单', route: '/profile/orders', color: '#07c160' },
      { icon: 'service-o', label: '专属客服', color: '#ee0a24' }
    ]
  : [
      { icon: 'certificate', label: '校友认证', route: '/profile/edit', color: '#1989fa' },
      { icon: 'orders-o', label: '我的订单', route: '/profile/group-buy', color: '#07c160' },
      { icon: 'bookmark-o', label: '我的课程', route: '/profile/subscribe', color: '#ff976a' },
      { icon: 'service-o', label: '专属客服', color: '#ee0a24' }
    ])

const onServiceClick = (item: any) => {
  if (item.route) router.push(item.route)
  else showToast('客服功能开发中')
}
</script>

<template>
  <div class="profile-page">
    <!-- 顶部卡片 -->
    <div class="profile-header">
      <div class="header-bg"></div>
      <div class="user-card">
        <div class="user-info">
          <img :src="userBase.avatar" class="avatar" @click="isAlumni ? router.push('/profile/edit') : router.push('/profile/edit')" />
          <div class="user-text">
            <div class="user-name-row">
              <span class="name">{{ userBase.name }}</span>
              <van-tag color="#6fa4cf" text-color="#fff" size="small" @click="showRolePicker = true">
                {{ currentRole }} <van-icon name="arrow-down" size="10" />
              </van-tag>
            </div>
            <div class="user-meta" v-if="isAlumni">{{ userBase.school }} · {{ userBase.year }} · {{ userBase.location }}</div>
            <div class="user-meta" v-else>{{ userBase.location }}</div>
            <div class="user-tags" v-if="isAlumni">
              <van-tag v-for="t in userBase.tags" :key="t" plain size="small" style="margin-right:4px">{{ t }}</van-tag>
            </div>
          </div>
          <van-icon name="setting-o" size="22" color="#fff" @click="showToast('设置')" />
        </div>

        <!-- 数据统计 -->
        <div class="stats-row">
          <div v-for="s in quickStats" :key="s.label" class="stat-item" @click="router.push(s.route)">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 名片交换通知 -->
    <div v-if="isAlumni && pendingCount > 0" class="exchange-notice">
      <div class="en-header">
        <van-icon name="friends-o" size="20" color="#1989fa" />
        <span class="en-title">名片交换请求</span>
        <van-badge :content="pendingCount" />
      </div>
      <div v-for="req in incomingRequests.filter(r => r.status === 'pending')" :key="req.id" class="en-card">
        <img :src="req.from.avatar" class="en-avatar" />
        <div class="en-info">
          <div class="en-name">{{ req.from.name }}</div>
          <div class="en-school">{{ req.from.school }} · {{ req.from.major }} · {{ req.from.year }}</div>
          <div class="en-date">{{ req.date }}</div>
        </div>
        <div class="en-actions">
          <van-button size="small" type="primary" round @click="acceptRequest(req.id); showToast('已接受交换请求')">
            <van-icon name="checked" size="14" />
          </van-button>
          <van-button size="small" plain round type="danger" @click="rejectRequest(req.id)">
            <van-icon name="clear" size="14" />
          </van-button>
        </div>
      </div>
    </div>

    <!-- 会员推广卡片 -->
    <div v-if="showMemberPromo" class="promo-card" @click="router.push('/profile/member-edit')">
      <div class="promo-icon">
        <van-icon name="vip-card-o" size="28" color="#ff976a" />
      </div>
      <div class="promo-text">
        <div class="promo-title">开通商务会员</div>
        <div class="promo-desc">享企业展示、活动发布等特权</div>
      </div>
      <van-icon name="arrow" color="#999" />
    </div>

    <!-- 快捷服务 -->
    <div class="service-section">
      <div class="service-grid">
        <div v-for="item in serviceGrid" :key="item.label" class="service-item" @click="onServiceClick(item)">
          <div class="service-icon" :style="{ background: item.color }">
            <van-icon :name="item.icon" size="22" color="#fff" />
          </div>
          <div class="service-label">{{ item.label }}</div>
        </div>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="menu-section">
      <van-cell-group inset>
        <van-cell v-for="m in roleMenus" :key="m.label" :title="m.label" is-link @click="router.push(m.route)">
          <template #icon><van-icon :name="m.icon" size="20" color="var(--primary)" style="margin-right:12px" /></template>
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 积分条（商务会员） -->
    <div v-if="showPoints" class="points-bar" @click="router.push('/profile/points')">
      <van-icon name="gold-coin-o" size="20" color="#ff976a" />
      <span class="points-text">当前积分：<strong>1250</strong></span>
      <span class="points-tip">查看明细 ></span>
    </div>

    <!-- 退出登录 / 重置数据 -->
    <div style="padding: 16px 16px 30px; text-align: center; display: flex; gap: 12px; justify-content: center">
      <van-button plain round size="small" type="default" @click="doLogout">退出登录</van-button>
      <van-button plain round size="small" type="warning" @click="doReset">重置演示数据</van-button>
    </div>

    <!-- 角色选择器 -->
    <van-action-sheet v-model:show="showRolePicker" :actions="roleOptions.map(r => ({ name: r.label }))" cancel-text="取消" @select="(a: any) => { setRole(roleOptions.find(r => r.label === a.name)!.value); showRolePicker = false }" />
  </div>
</template>

<style scoped>
.profile-page { min-height: 100vh; background: #f5f5f5; padding-bottom: 60px; }

.profile-header { position: relative; padding: 16px 16px 0; }
.header-bg {
  position: absolute; top: 0; left: 0; right: 0; height: 180px;
  background: linear-gradient(135deg, #6fa4cf, #9bc1de);
  border-radius: 0 0 20px 20px;
}
.user-card { position: relative; background: rgba(255,255,255,0.95); border-radius: 16px; padding: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }

.user-info { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
.avatar { width: 64px; height: 64px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; }
.user-text { flex: 1; }
.user-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.name { font-size: 18px; font-weight: 700; }
.user-meta { font-size: 12px; color: var(--text-light); margin-bottom: 6px; }
.user-tags { display: flex; gap: 4px; flex-wrap: wrap; }

.stats-row { display: flex; padding: 12px 0 0; border-top: 1px solid var(--border); }
.stat-item { flex: 1; text-align: center; cursor: pointer; }
.stat-value { font-size: 20px; font-weight: 700; color: var(--primary); margin-bottom: 2px; }
.stat-label { font-size: 11px; color: var(--text-lighter); }

.promo-card {
  display: flex; align-items: center; gap: 12px; margin: 12px 16px;
  padding: 14px 16px; background: linear-gradient(135deg, #fff5e6, #ffe8cc);
  border-radius: 12px; cursor: pointer;
}
.promo-icon { flex-shrink: 0; }
.promo-text { flex: 1; }
.promo-title { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
.promo-desc { font-size: 11px; color: var(--text-light); }

.service-section { margin: 0 16px 12px; background: #fff; border-radius: 12px; padding: 16px 12px; }
.service-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.service-item { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
.service-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.service-label { font-size: 12px; color: var(--text); }

.menu-section { margin: 0 0 12px; }

/* 交换通知 */
.exchange-notice { margin: 12px 16px; background: #fff; border-radius: 12px; padding: 14px 16px; }
.en-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.en-title { font-size: 15px; font-weight: 600; flex: 1; }
.en-card { display: flex; align-items: center; gap: 10px; padding: 12px 0; border-top: 1px solid var(--border); }
.en-avatar { width: 40px; height: 40px; border-radius: 50%; }
.en-info { flex: 1; min-width: 0; }
.en-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
.en-school { font-size: 11px; color: var(--text-light); margin-bottom: 2px; }
.en-date { font-size: 10px; color: var(--text-lighter); }
.en-actions { display: flex; gap: 6px; }

.points-bar {
  display: flex; align-items: center; gap: 8px; margin: 0 16px 12px;
  padding: 12px 16px; background: linear-gradient(90deg, #fff, #fff5e6);
  border-radius: 12px; cursor: pointer;
}
.points-text { flex: 1; font-size: 13px; color: var(--text); }
.points-text strong { color: #ff976a; font-size: 16px; }
.points-tip { font-size: 12px; color: var(--text-lighter); }
</style>
