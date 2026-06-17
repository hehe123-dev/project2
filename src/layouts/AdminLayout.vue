<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  Odometer, Document, ChatDotRound, User, VideoCamera,
  ShoppingCart, Postcard, Money, SwitchButton, Flag, Headset, Calendar
} from '@element-plus/icons-vue'
import { adminInfo, adminLogout } from '@/composables/useAdmin'
import logoImg from '@/assets/logo.jpeg'

const route = useRoute()
const router = useRouter()

const menus = [
  { key: '/admin', label: '工作台', icon: Odometer },
  { key: '/admin/news', label: '资讯管理', icon: Document },
  { key: '/admin/topics', label: '主题分享', icon: ChatDotRound },
  { key: '/admin/interviews', label: '会员专访', icon: User },
  { key: '/admin/groups', label: '社团管理', icon: Flag },
  { key: '/admin/help', label: '校友互助', icon: Headset },
  { key: '/admin/activities', label: '活动管理', icon: Calendar },
  { key: '/admin/courses', label: '课程管理', icon: VideoCamera },
  { key: '/admin/groupbuy', label: '团购管理', icon: ShoppingCart },
  { key: '/admin/cert', label: '校友认证', icon: Postcard },
  { key: '/admin/recharge', label: '会员充值', icon: Money }
]

const activeMenu = computed(() => route.path)

const onSelect = (key: string) => {
  if (key !== route.path) router.push(key)
}

const onLogout = () => {
  ElMessageBox.confirm('确定要退出后台运营系统？', '退出登录', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      adminLogout()
      ElMessage.success('已退出')
      router.replace('/admin/login')
    })
    .catch(() => {})
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside width="220px" class="admin-aside">
      <div class="brand">
        <img :src="logoImg" class="brand-logo" />
        <div class="brand-text">
          <div class="brand-name">白石桥七号</div>
          <div class="brand-sub">运营管理后台</div>
        </div>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="admin-menu"
        background-color="transparent"
        text-color="rgba(255,255,255,0.85)"
        active-text-color="#fff"
        @select="onSelect"
      >
        <el-menu-item v-for="m in menus" :key="m.key" :index="m.key">
          <el-icon><component :is="m.icon" /></el-icon>
          <template #title>{{ m.label }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="admin-header">
        <div class="header-left">
          <span class="page-title">{{ menus.find(m => m.key === route.path)?.label || '运营管理' }}</span>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" :src="adminInfo.avatar" />
              <span class="user-name">{{ adminInfo.name }}</span>
              <el-icon style="margin-left:4px"><svg viewBox="0 0 1024 1024" width="12" height="12"><path d="M512 715L181 384h662z" fill="currentColor"/></svg></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="onLogout">
                  <el-icon><SwitchButton /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.admin-layout {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0; left: 0;
}

.admin-aside {
  background: linear-gradient(180deg, #1a3a5c 0%, #0f2540 100%);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.brand-logo {
  width: 38px; height: 38px; border-radius: 8px;
  object-fit: cover;
  background: #fff;
}
.brand-name { color: #fff; font-size: 15px; font-weight: 700; }
.brand-sub { color: rgba(255,255,255,0.6); font-size: 11px; margin-top: 2px; }

.admin-menu {
  border-right: none;
  flex: 1;
  padding: 8px 0;
}
.admin-menu :deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
  margin: 4px 12px;
  border-radius: 6px;
}
.admin-menu :deep(.el-menu-item:hover) {
  background: rgba(255,255,255,0.08) !important;
}
.admin-menu :deep(.el-menu-item.is-active) {
  background: rgba(74,144,217,0.25) !important;
  color: #fff !important;
}

.admin-header {
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.page-title { font-size: 16px; font-weight: 600; color: #1a3a5c; }
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.user-info:hover { background: #f5f7fa; }
.user-name { font-size: 14px; color: #333; }

.admin-main {
  background: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>
