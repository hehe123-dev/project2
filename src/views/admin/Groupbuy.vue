<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Search, Clock } from '@element-plus/icons-vue'
import { groupBuyList } from '@/mock/data'

const list = ref(groupBuyList.map(g => ({ ...g, published: true })))
const search = ref('')
const activeTab = ref('all')
const showForm = ref(false)
const isEdit = ref(false)

const emptyForm = () => ({
  id: 0,
  title: '',
  cover: 'https://picsum.photos/seed/gb-new/400/400',
  price: 0,
  originalPrice: 0,
  soldCount: 0,
  totalCount: 100,
  endDate: '',
  category: '校园文创',
  supplier: '',
  desc: '',
  shipping: '下单后48小时内发货，全国包邮',
  published: true
})

const form = reactive<any>(emptyForm())
const categoryOptions = ['校园文创', '食品特产', '生活好物', '科技数码', '图书音像']

const isEnded = (item: any) => {
  if (!item.endDate) return false
  return new Date(item.endDate) < new Date('2026-06-16')
}

const filtered = computed(() => {
  let result = list.value
  if (activeTab.value === 'active') result = result.filter(g => g.published && !isEnded(g))
  else if (activeTab.value === 'offline') result = result.filter(g => !g.published)
  else if (activeTab.value === 'ended') result = result.filter(g => isEnded(g))
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.supplier.toLowerCase().includes(q)
    )
  }
  return result
})

const counts = computed(() => ({
  all: list.value.length,
  active: list.value.filter(g => g.published && !isEnded(g)).length,
  offline: list.value.filter(g => !g.published).length,
  ended: list.value.filter(g => isEnded(g)).length
}))

const stats = computed(() => ({
  total: list.value.length,
  totalSold: list.value.reduce((s, g) => s + (g.soldCount || 0), 0),
  totalRevenue: list.value.reduce((s, g) => s + (g.soldCount || 0) * (g.price || 0), 0),
  avgPrice: list.value.length
    ? Math.round(list.value.reduce((s, g) => s + (g.price || 0), 0) / list.value.length)
    : 0
}))

const progressPercent = (item: any) => {
  if (!item.totalCount) return 0
  return Math.min(100, Math.round((item.soldCount / item.totalCount) * 100))
}

const onAdd = () => {
  isEdit.value = false
  Object.assign(form, emptyForm())
  showForm.value = true
}

const onEdit = (row: any) => {
  isEdit.value = true
  Object.assign(form, row)
  showForm.value = true
}

const onSave = () => {
  if (!form.title.trim()) return ElMessage.warning('请填写商品名称')
  if (form.price <= 0) return ElMessage.warning('请填写团购价格')
  if (!form.supplier.trim()) return ElMessage.warning('请填写供应商')
  if (isEdit.value) {
    const idx = list.value.findIndex(g => g.id === form.id)
    if (idx > -1) list.value[idx] = { ...list.value[idx], ...form }
    ElMessage.success('已保存修改')
  } else {
    list.value.unshift({ ...form, id: Date.now(), soldCount: 0 })
    ElMessage.success('已新建团购')
  }
  showForm.value = false
}

const onToggle = (row: any) => {
  row.published = !row.published
  ElMessage.success(row.published ? '已上架' : '已下架')
}

const onDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除「${row.title}」？`, '删除团购', { type: 'warning' })
    .then(() => {
      list.value = list.value.filter(g => g.id !== row.id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}

const itemStatus = (item: any) => {
  if (!item.published) return { type: 'warning', text: '已下架' }
  if (isEnded(item)) return { type: 'info', text: '已结束' }
  return { type: 'success', text: '进行中' }
}
</script>

<template>
  <div class="admin-groupbuy">
    <!-- 数据统计 -->
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="商品总数" :value="stats.total" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="累计销量" :value="stats.totalSold" value-style="color:#67c23a" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="总销售额" :value="stats.totalRevenue" prefix="¥" value-style="color:#f56c6c" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="平均单价" :value="stats.avgPrice" prefix="¥" value-style="color:#e6a23c" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 团购表格 -->
    <el-card>
      <div class="head">
        <el-tabs v-model="activeTab">
          <el-tab-pane :label="`全部 (${counts.all})`" name="all" />
          <el-tab-pane :label="`进行中 (${counts.active})`" name="active" />
          <el-tab-pane :label="`已下架 (${counts.offline})`" name="offline" />
          <el-tab-pane :label="`已结束 (${counts.ended})`" name="ended" />
        </el-tabs>
        <div style="display:flex;gap:12px;align-items:center">
          <el-input
            v-model="search"
            :prefix-icon="Search"
            placeholder="搜索商品名/供应商"
            clearable
            style="width: 240px"
          />
          <el-button type="primary" :icon="Plus" @click="onAdd">新建团购</el-button>
        </div>
      </div>

      <el-table :data="filtered" stripe style="width: 100%">
        <el-table-column label="封面" width="100">
          <template #default="{ row }">
            <el-image :src="row.cover" fit="cover" style="width:64px;height:64px;border-radius:4px" />
          </template>
        </el-table-column>
        <el-table-column label="商品" min-width="280">
          <template #default="{ row }">
            <div style="font-weight:600">{{ row.title }}</div>
            <div style="font-size:12px;color:#909399;margin-top:4px">
              <el-tag size="small" effect="plain">{{ row.category }}</el-tag>
              <span style="margin-left:8px">{{ row.supplier }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="160">
          <template #default="{ row }">
            <div style="color:#f56c6c;font-weight:700;font-size:16px">¥{{ row.price }}</div>
            <div style="font-size:12px;color:#909399;text-decoration:line-through">¥{{ row.originalPrice }}</div>
          </template>
        </el-table-column>
        <el-table-column label="销量进度" min-width="220">
          <template #default="{ row }">
            <div style="font-size:12px;display:flex;justify-content:space-between;margin-bottom:4px">
              <span>已售 {{ row.soldCount }}/{{ row.totalCount }}</span>
              <span style="color:#909399">{{ progressPercent(row) }}%</span>
            </div>
            <el-progress :percentage="progressPercent(row)" :show-text="false" :stroke-width="8" />
          </template>
        </el-table-column>
        <el-table-column label="截止日期" width="140">
          <template #default="{ row }">
            <div><el-icon><Clock /></el-icon> {{ row.endDate }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="itemStatus(row).type as any" size="small">
              {{ itemStatus(row).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
            <el-button size="small" :type="row.published ? 'warning' : 'success'" @click="onToggle(row)">
              {{ row.published ? '下架' : '上架' }}
            </el-button>
            <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新建/编辑对话框 -->
    <el-dialog v-model="showForm" :title="isEdit ? '编辑团购' : '新建团购'" width="720px" destroy-on-close>
      <el-form label-width="100px">
        <el-divider content-position="left">基础信息</el-divider>
        <el-form-item label="商品名称" required>
          <el-input v-model="form.title" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="封面图URL">
          <el-input v-model="form.cover" placeholder="封面图链接" />
        </el-form-item>
        <el-form-item label="供应商" required>
          <el-input v-model="form.supplier" placeholder="请输入供应商" style="width: 320px" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category" placeholder="选择分类" style="width: 240px">
            <el-option v-for="c in categoryOptions" :key="c" :label="c" :value="c" />
          </el-select>
        </el-form-item>

        <el-divider content-position="left">价格与库存</el-divider>
        <el-form-item label="团购价" required>
          <el-input-number v-model="form.price" :min="0" :precision="0" controls-position="right" />
          <span style="margin-left:8px;color:#909399;font-size:12px">元</span>
        </el-form-item>
        <el-form-item label="原价">
          <el-input-number v-model="form.originalPrice" :min="0" :precision="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="库存总量">
          <el-input-number v-model="form.totalCount" :min="1" :precision="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker v-model="form.endDate" type="date" value-format="YYYY-MM-DD" placeholder="选择截止日期" />
        </el-form-item>

        <el-divider content-position="left">商品详情</el-divider>
        <el-form-item label="商品介绍">
          <el-input v-model="form.desc" type="textarea" :rows="3" placeholder="商品介绍" />
        </el-form-item>
        <el-form-item label="发货说明">
          <el-input v-model="form.shipping" type="textarea" :rows="2" placeholder="发货说明" />
        </el-form-item>
        <el-form-item label="立即上架">
          <el-switch v-model="form.published" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.admin-groupbuy { max-width: 1400px; margin: 0 auto; }
.head {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 4px;
}
.head :deep(.el-tabs) { flex: 1; }
.head :deep(.el-tabs__header) { margin-bottom: 0; }
</style>
