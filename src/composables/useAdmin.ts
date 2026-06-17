import { ref } from 'vue'

export const isAdminLoggedIn = ref(false)
export const adminInfo = ref({ name: '运营管理员', avatar: 'https://picsum.photos/seed/admin/100/100' })

export function adminLogin(username: string, password: string) {
  if (username === 'admin' && password === 'admin') {
    isAdminLoggedIn.value = true
    return true
  }
  return false
}

export function adminLogout() {
  isAdminLoggedIn.value = false
}

// 管理模块
export const adminModules = [
  { key: 'news', label: '资讯管理', icon: 'newspaper-o', color: '#4a90d9', bg: '#ebf3fc', desc: '编辑发布资讯文章' },
  { key: 'topics', label: '主题分享', icon: 'comment-o', color: '#67c23a', bg: '#edf7e6', desc: '管理主题分享内容' },
  { key: 'interviews', label: '会员专访', icon: 'user-circle-o', color: '#e6a23c', bg: '#fdf6ec', desc: '编辑专访稿件' },
  { key: 'courses', label: '课程管理', icon: 'video-o', color: '#8b5cf6', bg: '#f3f0ff', desc: '管理在线课程' },
  { key: 'groupbuy', label: '团购管理', icon: 'shopping-cart-o', color: '#f97316', bg: '#fff7ed', desc: '管理团购商品' },
  { key: 'cert', label: '校友认证', icon: 'certificate', color: '#06b6d4', bg: '#ecfeff', desc: '审核校友认证申请' },
  { key: 'recharge', label: '会员充值', icon: 'paid', color: '#ec4899', bg: '#fdf2f8', desc: '会员充值订单管理' }
]
