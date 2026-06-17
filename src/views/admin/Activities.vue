<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { activityList } from '@/mock/data'

const list = ref<any[]>(activityList.map(a => ({ ...a, published: true })))
const search = ref('')
const activeTab = ref('all')
const showForm = ref(false)
const isEdit = ref(false)

const emptyForm = () => ({
  id: 0, title: '', cover: 'https://picsum.photos/seed/act-new/400/240', date: '',
  location: '', status: '报名中', fee: 0, organizer: '', orgAvatar: 'https://picsum.photos/seed/org/100/100',
  deadline: '', description: '', registered: 0, published: true
})

const form = reactive<any>(emptyForm())

const filtered = computed(() => {
  let result = list.value
  if (activeTab.value === 'open') result = result.filter(a => a.status === '报名中')
  else if (activeTab.value === 'closed') result = result.filter(a => a.status !== '报名中')
  else if (activeTab.value === 'offline') result = result.filter(a => !a.published)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(a => a.title.toLowerCase().includes(q) || a.organizer.includes(q) || a.location?.includes(q))
  }
  return result
})

const stats = computed(() => ({
  total: list.value.length,
  totalRegistered: list.value.reduce((s, a) => s + (a.registered || 0), 0),
  openCount: list.value.filter(a => a.status === '报名中').length
}))

const onAdd = () => { isEdit.value = false; Object.assign(form, emptyForm()); showForm.value = true }
const onEdit = (row: any) => { isEdit.value = true; Object.assign(form, JSON.parse(JSON.stringify(row))); showForm.value = true }

const onSave = () => {
  if (!form.title.trim()) return ElMessage.warning('请填写活动名称')
  if (!form.date) return ElMessage.warning('请选择活动日期')
  if (isEdit.value) {
    const idx = list.value.findIndex(a => a.id === form.id)
    if (idx > -1) list.value[idx] = { ...list.value[idx], ...form }
    ElMessage.success('已保存')
  } else {
    list.value.unshift({ ...form, id: Date.now(), registered: 0 })
    ElMessage.success('已新建活动')
  }
  showForm.value = false
}

const onToggle = (row: any) => { row.published = !row.published; ElMessage.success(row.published ? '已上架' : '已下架') }
const onDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除活动「${row.title}」？`, '删除活动', { type: 'warning' })
    .then(() => { list.value = list.value.filter(a => a.id !== row.id); ElMessage.success('已删除') })
    .catch(() => {})
}
</script>

<template>
  <div class="admin-module">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6"><el-card shadow="hover"><el-statistic title="活动总数" :value="stats.total" /></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover"><el-statistic title="报名中" :value="stats.openCount" value-style="color:#67c23a" /></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover"><el-statistic title="报名人次" :value="stats.totalRegistered" value-style="color:#e6a23c" /></el-card></el-col>
      <el-col :span="6"><el-card shadow="hover"><el-statistic title="平均报名" :value="stats.total ? Math.round(stats.totalRegistered / stats.total) : 0" value-style="color:#4a90d9"><template #suffix>人/活动</template></el-statistic></el-card></el-col>
    </el-row>

    <el-card>
      <div class="toolbar">
        <div style="display:flex;align-items:center;gap:16px">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="全部" name="all" />
            <el-tab-pane label="报名中" name="open" />
            <el-tab-pane label="已结束" name="closed" />
            <el-tab-pane label="已下架" name="offline" />
          </el-tabs>
        </div>
        <div class="toolbar-right">
          <el-input v-model="search" :prefix-icon="Search" placeholder="搜索活动名/组织者/地点" clearable style="width: 240px" />
          <el-button type="primary" :icon="Plus" @click="onAdd">新建活动</el-button>
        </div>
      </div>

      <el-table :data="filtered" stripe empty-text="暂无活动数据">
        <el-table-column label="封面" width="100">
          <template #default="{ row }"><el-image :src="row.cover" fit="cover" style="width:72px;height:48px;border-radius:4px" /></template>
        </el-table-column>
        <el-table-column label="活动名称" min-width="260">
          <template #default="{ row }">
            <div style="font-weight:600">{{ row.title }}</div>
            <div style="font-size:12px;color:#909399;margin-top:4px">{{ row.description?.slice(0, 60) }}...</div>
          </template>
        </el-table-column>
        <el-table-column label="时间/地点" width="190">
          <template #default="{ row }">
            <div style="font-size:13px">{{ row.date }}</div>
            <div style="font-size:12px;color:#909399">{{ row.location }}</div>
          </template>
        </el-table-column>
        <el-table-column label="组织者" width="100">
          <template #default="{ row }">
            <div style="display:flex;align-items:center;gap:6px">
              <el-avatar :src="row.orgAvatar" :size="24" />
              <span style="font-size:13px">{{ row.organizer }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="费用" width="80">
          <template #default="{ row }">{{ row.fee ? `¥${row.fee}` : '免费' }}</template>
        </el-table-column>
        <el-table-column label="报名/状态" width="120">
          <template #default="{ row }">
            <div style="font-size:12px">{{ row.registered }} 人</div>
            <el-tag :type="row.status === '报名中' ? 'success' : 'info'" size="small" style="margin-top:4px">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
            <el-button size="small" :type="row.published ? 'warning' : 'success'" @click="onToggle(row)">{{ row.published ? '下架' : '上架' }}</el-button>
            <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
              <template #reference><el-button size="small" type="danger">删除</el-button></template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showForm" :title="isEdit ? '编辑活动' : '新建活动'" width="620px" destroy-on-close>
      <el-form label-width="90px">
        <el-form-item label="活动名称" required><el-input v-model="form.title" placeholder="请输入活动名称" /></el-form-item>
        <el-form-item label="封面图URL"><el-input v-model="form.cover" placeholder="封面图链接" /></el-form-item>
        <el-form-item label="活动日期" required><el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" placeholder="选择日期" /></el-form-item>
        <el-form-item label="活动地点"><el-input v-model="form.location" placeholder="活动地点" /></el-form-item>
        <el-form-item label="组织者"><el-input v-model="form.organizer" placeholder="组织者姓名" style="width:200px" /></el-form-item>
        <el-form-item label="报名费用"><el-input-number v-model="form.fee" :min="0" :precision="0" controls-position="right" /><span style="margin-left:8px;color:#909399;font-size:12px">元（0=免费）</span></el-form-item>
        <el-form-item label="截止日期"><el-date-picker v-model="form.deadline" type="date" value-format="YYYY-MM-DD" placeholder="报名截止日期" /></el-form-item>
        <el-form-item label="活动描述"><el-input v-model="form.description" type="textarea" :rows="4" placeholder="活动详细介绍" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="showForm = false">取消</el-button><el-button type="primary" @click="onSave">保存</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped>
.admin-module { max-width: 1400px; margin: 0 auto; }
.toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.toolbar :deep(.el-tabs__header) { margin-bottom: 0; }
.toolbar-right { display: flex; align-items: center; gap: 12px; }
</style>
