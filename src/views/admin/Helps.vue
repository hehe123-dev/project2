<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { helpList } from '@/mock/data'

const list = ref<any[]>(helpList.map(h => ({ ...h, published: true })))
const search = ref('')
const activeTab = ref('all')
const showForm = ref(false)
const isEdit = ref(false)

const emptyForm = () => ({
  id: 0, title: '', publisher: { name: '', avatar: 'https://picsum.photos/seed/u-new/100/100', role: '认证校友' },
  date: '', description: '', status: '未解决', responseCount: 0, responses: [], published: true
})

const form = reactive<any>(emptyForm())
const statusOptions = ['未解决', '已解决']

const filtered = computed(() => {
  let result = list.value
  if (activeTab.value === 'open') result = result.filter(h => h.status === '未解决')
  else if (activeTab.value === 'solved') result = result.filter(h => h.status === '已解决')
  else if (activeTab.value === 'offline') result = result.filter(h => !h.published)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(h =>
      h.title.toLowerCase().includes(q) ||
      h.publisher?.name.includes(q) ||
      h.description?.includes(q)
    )
  }
  return result
})

const stats = computed(() => ({
  total: list.value.length,
  open: list.value.filter(h => h.status === '未解决').length,
  solved: list.value.filter(h => h.status === '已解决').length
}))

const onAdd = () => { isEdit.value = false; Object.assign(form, emptyForm()); showForm.value = true }
const onEdit = (row: any) => { isEdit.value = true; Object.assign(form, JSON.parse(JSON.stringify(row))); showForm.value = true }

const onSave = () => {
  if (!form.title.trim()) return ElMessage.warning('请填写求助标题')
  if (!form.publisher.name.trim()) return ElMessage.warning('请填写发布者姓名')
  if (isEdit.value) {
    const idx = list.value.findIndex(h => h.id === form.id)
    if (idx > -1) list.value[idx] = { ...list.value[idx], ...form }
    ElMessage.success('已保存')
  } else {
    list.value.unshift({ ...form, id: Date.now(), responseCount: 0, responses: [], date: new Date().toISOString().slice(0, 10) })
    ElMessage.success('已新建求助')
  }
  showForm.value = false
}

const onToggle = (row: any) => { row.published = !row.published; ElMessage.success(row.published ? '已上架' : '已下架') }
const onMarkSolved = (row: any) => { row.status = row.status === '已解决' ? '未解决' : '已解决'; ElMessage.success(row.status === '已解决' ? '已标记为已解决' : '已恢复为未解决') }
const onDelete = (row: any) => {
  ElMessageBox.confirm(`确定删除求助「${row.title}」？`, '删除求助', { type: 'warning' })
    .then(() => { list.value = list.value.filter(h => h.id !== row.id); ElMessage.success('已删除') })
    .catch(() => {})
}
</script>

<template>
  <div class="admin-module">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="8"><el-card shadow="hover"><el-statistic title="求助总数" :value="stats.total" /></el-card></el-col>
      <el-col :span="8"><el-card shadow="hover"><el-statistic title="未解决" :value="stats.open" value-style="color:#f56c6c" /></el-card></el-col>
      <el-col :span="8"><el-card shadow="hover"><el-statistic title="已解决" :value="stats.solved" value-style="color:#67c23a" /></el-card></el-col>
    </el-row>

    <el-card>
      <div class="toolbar">
        <div style="display:flex;align-items:center;gap:16px">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="全部" name="all" />
            <el-tab-pane label="未解决" name="open" />
            <el-tab-pane label="已解决" name="solved" />
            <el-tab-pane label="已下架" name="offline" />
          </el-tabs>
        </div>
        <div class="toolbar-right">
          <el-input v-model="search" :prefix-icon="Search" placeholder="搜索标题/发布者/内容" clearable style="width: 240px" />
          <el-button type="primary" :icon="Plus" @click="onAdd">新建求助</el-button>
        </div>
      </div>

      <el-table :data="filtered" stripe empty-text="暂无求助数据">
        <el-table-column label="标题" min-width="280">
          <template #default="{ row }">
            <div style="font-weight:600">{{ row.title }}</div>
            <div style="font-size:12px;color:#909399;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px">{{ row.description }}</div>
          </template>
        </el-table-column>
        <el-table-column label="发布者" width="160">
          <template #default="{ row }">
            <div style="display:flex;align-items:center;gap:8px">
              <el-avatar :src="row.publisher?.avatar" :size="28" />
              <div>
                <div style="font-size:13px;font-weight:500">{{ row.publisher?.name }}</div>
                <el-tag size="small" effect="plain">{{ row.publisher?.role }}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="发布时间" width="120" />
        <el-table-column label="状态" width="140">
          <template #default="{ row }">
            <div style="display:flex;align-items:center;gap:6px">
              <el-tag :type="row.status === '已解决' ? 'success' : 'warning'" size="small">{{ row.status }}</el-tag>
              <span style="font-size:11px;color:#909399">{{ row.responseCount }} 人响应</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
            <el-button size="small" :type="row.status === '已解决' ? 'warning' : 'success'" @click="onMarkSolved(row)">{{ row.status === '已解决' ? '标未解决' : '标已解决' }}</el-button>
            <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
              <template #reference><el-button size="small" type="danger">删除</el-button></template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showForm" :title="isEdit ? '编辑求助' : '新建求助'" width="620px" destroy-on-close>
      <el-form label-width="90px">
        <el-form-item label="求助标题" required><el-input v-model="form.title" placeholder="请输入求助标题" /></el-form-item>
        <el-form-item label="发布者姓名" required><el-input v-model="form.publisher.name" placeholder="请输入发布者姓名" style="width:240px" /></el-form-item>
        <el-form-item label="发布者角色">
          <el-select v-model="form.publisher.role" style="width:240px">
            <el-option label="普通用户" value="普通用户" />
            <el-option label="认证校友" value="认证校友" />
            <el-option label="商务会员" value="商务会员" />
            <el-option label="服务机构" value="服务机构" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" style="width:240px">
            <el-option v-for="s in statusOptions" :key="s" :label="s" :value="s" />
          </el-select>
        </el-form-item>
        <el-form-item label="求助描述"><el-input v-model="form.description" type="textarea" :rows="5" placeholder="求助详细描述" /></el-form-item>
        <el-form-item label="上架"><el-switch v-model="form.published" /></el-form-item>
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
