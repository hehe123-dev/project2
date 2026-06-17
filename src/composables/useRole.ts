import { ref, computed } from 'vue'

export type UserRole = '普通用户' | '认证校友' | '商务会员' | '服务机构'

export const currentRole = ref<UserRole>('商务会员')

export const roleOptions: { label: string; value: UserRole }[] = [
  { label: '普通用户', value: '普通用户' },
  { label: '认证校友', value: '认证校友' },
  { label: '商务会员', value: '商务会员' },
  { label: '服务机构', value: '服务机构' }
]

export function useRole() {
  const setRole = (role: UserRole) => {
    currentRole.value = role
  }

  // 是否有发布权限
  const canPublish = computed(() => currentRole.value !== '普通用户')

  // 发布按钮可选的动作
  const publishActions = computed(() => {
    const actions: { name: string; value: string; icon: string }[] = []
    if (currentRole.value !== '普通用户') {
      actions.push({ name: '发布动态', value: 'feed', icon: 'photo-o' })
      actions.push({ name: '发布求助', value: 'help', icon: 'smile-comment-o' })
    }
    if (currentRole.value === '商务会员' || currentRole.value === '服务机构') {
      actions.push({ name: '发布活动', value: 'activity', icon: 'calendar-o' })
      actions.push({ name: '发布商务需求', value: 'demand', icon: 'orders-o' })
    }
    return actions
  })

  // 个人中心菜单
  const roleMenus = computed(() => {
    const menus: { label: string; icon: string; route: string }[] = []

    // 所有角色通用
    menus.push(
      { label: '订阅课程', icon: 'bookmark-o', route: '/profile/subscribe' },
      { label: '团购订单', icon: 'shopping-cart-o', route: '/profile/group-buy' },
      { label: '资讯收藏', icon: 'star-o', route: '/profile/favorites' },
      { label: '我的活动', icon: 'flag-o', route: '/profile/activities' }
    )

    // 普通用户: 注册入口
    if (currentRole.value === '普通用户') {
      menus.unshift(
        { label: '注册成为认证校友', icon: 'certificate', route: '/profile/edit' }
      )
    }

    // 认证校友及以上
    if (currentRole.value !== '普通用户') {
      menus.unshift(
        { label: '校友信息认证', icon: 'certificate', route: '/profile/edit' }
      )
      menus.push(
        { label: '好友', icon: 'friends-o', route: '/profile/favorites' },
        { label: '加入的社团', icon: 'cluster-o', route: '/profile/my-groups' },
        { label: '发布的动态', icon: 'photo-o', route: '/profile/my-feed' },
        { label: '我的求助', icon: 'smile-comment-o', route: '/profile/my-help' }
      )
    }

    // 认证校友: 会员注册入口
    if (currentRole.value === '认证校友') {
      menus.unshift(
        { label: '注册会员/缴纳会费', icon: 'vip-card-o', route: '/profile/member-edit' }
      )
    }

    // 商务会员及以上
    if (currentRole.value === '商务会员' || currentRole.value === '服务机构') {
      menus.unshift(
        { label: '完善会员资料', icon: 'idcard', route: '/profile/member-edit' }
      )
      menus.push(
        { label: '我的商务', icon: 'shop-o', route: '/profile/my-business' },
        { label: '分享的主题', icon: 'notes-o', route: '/profile/my-topics' },
        { label: '专属服务', icon: 'vip-card-o', route: '/profile/my-service' },
        { label: '贡献积分', icon: 'gold-coin-o', route: '/profile/points' }
      )
    }

    // 服务机构额外菜单
    if (currentRole.value === '服务机构') {
      menus.push(
        { label: '服务产品管理', icon: 'gem-o', route: '/profile/my-service' }
      )
    }

    return menus
  })

  const showMemberPromo = computed(() => currentRole.value === '认证校友' || currentRole.value === '普通用户')
  const showPoints = computed(() => currentRole.value === '商务会员' || currentRole.value === '服务机构')

  return {
    currentRole,
    roleOptions,
    setRole,
    roleMenus,
    showMemberPromo,
    showPoints,
    canPublish,
    publishActions
  }
}
