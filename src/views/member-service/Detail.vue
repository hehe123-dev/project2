<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useGoBack } from '@/composables/useGoBack'

const route = useRoute()
const router = useRouter()
const goBack = useGoBack()
const category = route.params.category as string

const categoryMap: Record<string, string> = {
  market: '市场推广',
  empower: '企业赋能',
  'biz-activity': '商务活动',
  exclusive: '专属服务'
}

const subItems: Record<string, { id: number; title: string; provider: string; desc: string }[]> = {
  market: [
    { id: 1, title: '智能制造产线升级需求', provider: '北京智控科技', desc: '寻找有产线智能化改造需求的制造企业客户，提供AI驱动的智能控制方案。' },
    { id: 2, title: '医药产品渠道拓展合作', provider: '北京康源生物', desc: '寻求OTC药品渠道合作伙伴，共同拓展华北市场。' },
    { id: 3, title: '新能源储能项目合作', provider: '深圳星辰科技', desc: '寻找储能电站项目合作伙伴，提供储能系统集成方案。' }
  ],
  empower: [
    { id: 1, title: '早期创业项目投融资服务', provider: '启明创投', desc: '专注于天使轮和A轮投资，重点关注AI、生物医药、新能源领域。' },
    { id: 2, title: '企业数字化建设咨询', provider: '北京智控科技', desc: '为制造企业提供数字化转型规划、方案设计和实施服务。' },
    { id: 3, title: '高端人才猎头服务', provider: '猎聘网', desc: '面向科技企业的中高端技术和管理人才招聘服务。' },
    { id: 4, title: '企业合规与资质申报', provider: '北京正策律所', desc: '企业法律合规咨询、资质申报辅导、知识产权保护等服务。' }
  ],
  'biz-activity': [
    { id: 1, title: '北理工校友项目路演（第二季）', provider: '平台运营方', desc: '2026年7月15日，北京朝阳，校友创业项目展示与投融资对接。' },
    { id: 2, title: '智能制造专题私董会', provider: '张建国', desc: '限15人，深度研讨智能制造领域的创业和投资机会。' },
    { id: 3, title: '走进字节跳动——数字化转型参访', provider: '李明远', desc: '2026年7月5日，参访字节跳动总部，学习数字化转型经验。' }
  ],
  exclusive: [
    { id: 1, title: '国际学校择校咨询', provider: '英孚教育', desc: '为校友子女提供国际学校择校规划、申请辅导和语言培训服务。' },
    { id: 2, title: '高端体检套餐——校友专享', provider: '爱康国宾', desc: '校友专属全面体检套餐，含肿瘤筛查、心脑血管检查等多项。' },
    { id: 3, title: '私人医生健康管理', provider: '平安好医生', desc: '7×24小时在线问诊、三甲医院专家预约、健康档案管理服务。' }
  ]
}

const items = subItems[category] || []
</script>

<template>
  <div class="page-container">
    <van-nav-bar :title="categoryMap[category]" left-arrow @click-left="goBack" fixed placeholder />
    <div class="card-list" style="margin-top: 8px">
      <div v-for="item in items" :key="item.id" class="svc-item" @click="router.push('/service-provider/' + item.id)">
        <div class="si-title">{{ item.title }}</div>
        <div class="si-provider">提供方：{{ item.provider }}</div>
        <div class="si-desc">{{ item.desc }}</div>
        <van-button size="small" round type="primary" style="margin-top: 8px">联系Ta</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.svc-item { background: #fff; border-radius: 8px; padding: 14px; margin-bottom: 8px; }
.si-title { font-size: 15px; font-weight: 600; margin-bottom: 6px; }
.si-provider { font-size: 12px; color: var(--primary); margin-bottom: 6px; }
.si-desc { font-size: 13px; color: var(--text-light); line-height: 1.6; }
</style>
