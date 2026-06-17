import { createRouter, createWebHashHistory } from 'vue-router'
import { currentRole } from '@/composables/useRole'
import { isAdminLoggedIn } from '@/composables/useAdmin'

// 模拟登录状态
export const isLoggedIn = { value: false }

const roleRank: Record<string, number> = {
  '普通用户': 0,
  '认证校友': 1,
  '商务会员': 2,
  '服务机构': 3
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: () => import('@/views/admin/Login.vue')
    },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { admin: true },
      children: [
        {
          path: '',
          name: 'AdminHome',
          component: () => import('@/views/admin/Index.vue')
        },
        {
          path: 'cert',
          name: 'AdminCert',
          component: () => import('@/views/admin/Cert.vue')
        },
        {
          path: 'recharge',
          name: 'AdminRecharge',
          component: () => import('@/views/admin/Recharge.vue')
        },
        {
          path: 'courses',
          name: 'AdminCourses',
          component: () => import('@/views/admin/Courses.vue')
        },
        {
          path: 'groupbuy',
          name: 'AdminGroupbuy',
          component: () => import('@/views/admin/Groupbuy.vue')
        },
        {
          path: 'groups',
          name: 'AdminGroups',
          component: () => import('@/views/admin/Groups.vue')
        },
        {
          path: 'help',
          name: 'AdminHelp',
          component: () => import('@/views/admin/Helps.vue')
        },
        {
          path: 'activities',
          name: 'AdminActivities',
          component: () => import('@/views/admin/Activities.vue')
        },
        {
          path: ':type',
          name: 'AdminContent',
          component: () => import('@/views/admin/Content.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/home/Index.vue')
    },
    // 最新资讯
    { path: '/news', name: 'News', component: () => import('@/views/news/List.vue') },
    { path: '/news/:id', name: 'NewsDetail', component: () => import('@/views/news/Detail.vue') },
    // 校友名片 (需认证校友+)
    { path: '/alumni-card', name: 'AlumniCard', component: () => import('@/views/alumni-card/List.vue'), meta: { minRole: '认证校友' } },
    { path: '/alumni-card/:id', name: 'AlumniCardDetail', component: () => import('@/views/alumni-card/Detail.vue'), meta: { minRole: '认证校友' } },
    // 校友社团
    { path: '/alumni-group', name: 'AlumniGroup', component: () => import('@/views/alumni-group/List.vue') },
    { path: '/alumni-group/:id', name: 'AlumniGroupDetail', component: () => import('@/views/alumni-group/Detail.vue') },
    // 活动
    { path: '/activity', name: 'Activity', component: () => import('@/views/activity/List.vue') },
    { path: '/activity/:id', name: 'ActivityDetail', component: () => import('@/views/activity/Detail.vue') },
    { path: '/publish-activity', name: 'PublishActivity', component: () => import('@/views/activity/Publish.vue'), meta: { minRole: '商务会员' } },
    // 校友互助 (需认证校友+)
    { path: '/help', name: 'Help', component: () => import('@/views/help/List.vue'), meta: { minRole: '认证校友' } },
    { path: '/help/:id', name: 'HelpDetail', component: () => import('@/views/help/Detail.vue'), meta: { minRole: '认证校友' } },
    { path: '/publish-help', name: 'HelpPublish', component: () => import('@/views/help/Publish.vue'), meta: { minRole: '认证校友' } },
    // 会员名片 (需商务会员+)
    { path: '/member-card', name: 'MemberCard', component: () => import('@/views/member-card/List.vue'), meta: { minRole: '商务会员' } },
    { path: '/member-card/:id', name: 'MemberCardDetail', component: () => import('@/views/member-card/Detail.vue'), meta: { minRole: '商务会员' } },
    // 会员企业 (需商务会员+)
    { path: '/member-company', name: 'MemberCompany', component: () => import('@/views/member-company/List.vue'), meta: { minRole: '商务会员' } },
    { path: '/member-company/:id', name: 'MemberCompanyDetail', component: () => import('@/views/member-company/Detail.vue'), meta: { minRole: '商务会员' } },
    // 会员产品 (需商务会员+)
    { path: '/member-product', name: 'MemberProduct', component: () => import('@/views/member-product/List.vue'), meta: { minRole: '商务会员' } },
    { path: '/member-product/:id', name: 'MemberProductDetail', component: () => import('@/views/member-product/Detail.vue'), meta: { minRole: '商务会员' } },
    // 会员服务 (需商务会员+)
    { path: '/member-service', name: 'MemberService', component: () => import('@/views/member-service/Index.vue'), meta: { minRole: '商务会员' } },
    { path: '/member-service/:category', name: 'MemberServiceDetail', component: () => import('@/views/member-service/Detail.vue'), meta: { minRole: '商务会员' } },
    { path: '/service-provider/:id', name: 'ServiceProvider', component: () => import('@/views/member-service/Provider.vue'), meta: { minRole: '商务会员' } },
    // 主题分享
    { path: '/topic-share', name: 'TopicShare', component: () => import('@/views/topic-share/List.vue') },
    { path: '/topic-share/:id', name: 'TopicShareDetail', component: () => import('@/views/topic-share/Detail.vue') },
    // 会员专访
    { path: '/interview', name: 'Interview', component: () => import('@/views/interview/List.vue') },
    { path: '/interview/:id', name: 'InterviewDetail', component: () => import('@/views/interview/Detail.vue') },
    // 校友动态 (需认证校友+)
    { path: '/alumni-feed', name: 'AlumniFeed', component: () => import('@/views/alumni-feed/List.vue'), meta: { minRole: '认证校友' } },
    { path: '/alumni-feed/:id', name: 'AlumniFeedDetail', component: () => import('@/views/alumni-feed/Detail.vue'), meta: { minRole: '认证校友' } },
    { path: '/publish-feed', name: 'PublishFeed', component: () => import('@/views/alumni-feed/Publish.vue'), meta: { minRole: '认证校友' } },
    // 课程
    { path: '/courses', name: 'Courses', component: () => import('@/views/course/List.vue') },
    { path: '/courses/:id', name: 'CourseDetail', component: () => import('@/views/course/Detail.vue') },
    // 团购
    { path: '/group-buy', name: 'GroupBuy', component: () => import('@/views/group-buy/List.vue') },
    { path: '/group-buy/:id', name: 'GroupBuyDetail', component: () => import('@/views/group-buy/Detail.vue') },
    // 个人中心
    { path: '/profile', name: 'Profile', component: () => import('@/views/profile/Index.vue') },
    { path: '/profile/edit', name: 'ProfileEdit', component: () => import('@/views/profile/Edit.vue') },
    { path: '/profile/member-edit', name: 'ProfileMemberEdit', component: () => import('@/views/profile/MemberEdit.vue'), meta: { minRole: '认证校友' } },
    { path: '/profile/subscribe', name: 'ProfileSubscribe', component: () => import('@/views/profile/Subscribe.vue') },
    { path: '/profile/group-buy', name: 'ProfileGroupBuy', component: () => import('@/views/profile/GroupBuyOrders.vue') },
    { path: '/profile/favorites', name: 'ProfileFavorites', component: () => import('@/views/profile/Favorites.vue') },
    { path: '/profile/activities', name: 'ProfileActivities', component: () => import('@/views/profile/Activities.vue') },
    { path: '/profile/my-feed', name: 'ProfileMyFeed', component: () => import('@/views/profile/MyFeed.vue'), meta: { minRole: '认证校友' } },
    { path: '/profile/my-groups', name: 'ProfileMyGroups', component: () => import('@/views/profile/MyGroups.vue'), meta: { minRole: '认证校友' } },
    { path: '/profile/my-help', name: 'ProfileMyHelp', component: () => import('@/views/profile/MyHelp.vue'), meta: { minRole: '认证校友' } },
    { path: '/profile/my-business', name: 'ProfileMyBusiness', component: () => import('@/views/profile/MyBusiness.vue'), meta: { minRole: '商务会员' } },
    { path: '/profile/my-topics', name: 'ProfileMyTopics', component: () => import('@/views/profile/MyTopics.vue'), meta: { minRole: '商务会员' } },
    { path: '/profile/points', name: 'ProfilePoints', component: () => import('@/views/profile/Points.vue'), meta: { minRole: '商务会员' } }
  ]
})

router.beforeEach((to) => {
  // 后台路由独立判定
  if (to.path.startsWith('/admin')) {
    if (to.name === 'AdminLogin') return
    if (!isAdminLoggedIn.value) return '/admin/login'
    return
  }

  // 登录页不需要验证
  if (to.name === 'Login') return

  // 未登录跳转登录页
  if (!isLoggedIn.value) {
    return '/login'
  }

  // 角色权限校验
  if (to.meta.minRole) {
    const requiredRank = roleRank[to.meta.minRole as string]
    const userRank = roleRank[currentRole.value]
    if (userRank < requiredRank) {
      return '/home'
    }
  }
})

export default router
