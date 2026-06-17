<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Money, Document, Clock, TrendCharts } from '@element-plus/icons-vue'

const search = ref('')
const activeTab = ref('all')

const orders = ref([
  { id: 'PAY20260610152011', user: '赵明辉', avatar: 'https://picsum.photos/seed/r1/100/100', plan: '商务会员·年卡', amount: 1980, date: '2026-06-10 15:20', status: 'paid', payMethod: '微信支付' },
  { id: 'PAY20260610110042', user: '张志强', avatar: 'https://picsum.photos/seed/r2/100/100', plan: '服务机构·年卡', amount: 4980, date: '2026-06-10 11:00', status: 'paid', payMethod: '支付宝' },
  { id: 'PAY20260609183522', user: '王晓梅', avatar: 'https://picsum.photos/seed/r3/100/100', plan: '商务会员·季卡', amount: 580, date: '2026-06-09 18:35', status: 'pending', payMethod: '微信支付' },
  { id: 'PAY20260608091011', user: '陈一鸣', avatar: 'https://picsum.photos/seed/r4/100/100', plan: '商务会员·年卡', amount: 1980, date: '2026-06-08 09:10', status: 'paid', payMethod: '银行转账' },
  { id: 'PAY20260607145033', user: '李梦琪', avatar: 'https://picsum.photos/seed/r5/100/100', plan: '商务会员·月卡', amount: 199, date: '2026-06-07 14:50', status: 'refunded', payMethod: '微信支付' },
  { id: 'PAY20260606093015', user: '黄文杰', avatar: 'https://picsum.photos/seed/r6/100/100', plan: '商务会员·年卡', amount: 1980, date: '2026-06-06 09:30', status: 'paid', payMethod: '微信支付' },
  { id: 'PAY20260605160044', user: '孙磊', avatar: 'https://picsum.photos/seed/r7/100/100', plan: '商务会员·季卡', amount: 580, date: '2026-06-05 16:00', status: 'paid', payMethod: '支付宝' }
])

const stats = computed(() => {
  const paid = orders.value.filter(o => o.status === 'paid')
  const pending = orders.value.filter(o => o.status === 'pending')
  return {
    total: paid.reduce((s, o) => s + o.amount, 0),
    count: paid.length,
    pendingCount: pending.length,
    pendingAmount: pending.reduce((s, o) => s + o.amount, 0)
  }
})

const filtered = computed(() => {
  let result = activeTab.value === 'all' ? orders.value : orders.value.filter(o => o.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(o =>
      o.user.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.plan.includes(search.value)
    )
  }
  return result
})

const counts = computed(() => ({
  all: orders.value.length,
  paid: orders.value.filter(o => o.status === 'paid').length,
  pending: orders.value.filter(o => o.status === 'pending').length,
  refunded: orders.value.filter(o => o.status === 'refunded').length
}))

const statusMap: Record<string, { text: string; type: any }> = {
  paid: { text: '已支付', type: 'success' },
  pending: { text: '待支付', type: 'warning' },
  refunded: { text: '已退款', type: 'danger' }
}
</script>

<template>
  <div class="admin-recharge">
    <!-- 统计卡片 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="本月收入" :value="stats.total" :precision="0" prefix="¥">
            <template #title><span style="color:#909399">本月收入</span></template>
          </el-statistic>
          <div style="font-size:12px;color:#67c23a;margin-top:4px">
            <el-icon><TrendCharts /></el-icon> 较上月 +18.5%
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="成功订单" :value="stats.count">
            <template #suffix>
              <el-icon style="color:#67c23a"><Document /></el-icon>
            </template>
          </el-statistic>
          <div style="font-size:12px;color:#909399;margin-top:4px">本月已成交</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="待支付订单" :value="stats.pendingCount">
            <template #suffix>
              <el-icon style="color:#e6a23c"><Clock /></el-icon>
            </template>
          </el-statistic>
          <div style="font-size:12px;color:#909399;margin-top:4px">¥{{ stats.pendingAmount.toLocaleString() }} 待收款</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="平均客单价" :value="stats.count ? Math.round(stats.total / stats.count) : 0" prefix="¥">
            <template #suffix>
              <el-icon style="color:#4a90d9"><Money /></el-icon>
            </template>
          </el-statistic>
          <div style="font-size:12px;color:#909399;margin-top:4px">本月已支付订单</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 订单列表 -->
    <el-card>
      <div class="head">
        <el-tabs v-model="activeTab">
          <el-tab-pane :label="`全部 (${counts.all})`" name="all" />
          <el-tab-pane :label="`已支付 (${counts.paid})`" name="paid" />
          <el-tab-pane :label="`待支付 (${counts.pending})`" name="pending" />
          <el-tab-pane :label="`已退款 (${counts.refunded})`" name="refunded" />
        </el-tabs>
        <el-input
          v-model="search"
          :prefix-icon="Search"
          placeholder="搜索订单号/用户名/套餐"
          clearable
          style="width: 280px"
        />
      </div>

      <el-table :data="filtered" stripe style="width: 100%" empty-text="暂无订单">
        <el-table-column prop="id" label="订单号" width="190">
          <template #default="{ row }">
            <span style="font-family:monospace;color:#606266">{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户" width="180">
          <template #default="{ row }">
            <div style="display:flex;align-items:center;gap:10px">
              <el-avatar :src="row.avatar" :size="32" />
              <span style="font-weight:500">{{ row.user }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="plan" label="充值套餐" min-width="180" />
        <el-table-column label="金额" width="120">
          <template #default="{ row }">
            <span style="font-size:16px;font-weight:700;color:#f56c6c">¥{{ row.amount.toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payMethod" label="支付方式" width="120" />
        <el-table-column prop="date" label="下单时间" width="170" />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusMap[row.status].type" size="small">{{ statusMap[row.status].text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default>
            <el-button size="small" link type="primary">详情</el-button>
            <el-button size="small" link>导出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.admin-recharge { max-width: 1400px; margin: 0 auto; }
.head {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 4px;
}
.head :deep(.el-tabs) { flex: 1; }
.head :deep(.el-tabs__header) { margin-bottom: 0; }
</style>
