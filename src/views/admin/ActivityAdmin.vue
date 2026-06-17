<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { activityList } from '@/mock/data'
import CoverUploader from '@/components/CoverUploader.vue'

const activeTab = ref('全部')
const searchText = ref('')

const typeTabs = ['全部', '待审核', '校友活动', '商务活动', '平台活动']

const typeColor: Record<string, string> = {
  '校友活动': 'success',
  '商务活动': 'warning',
  '平台活动': 'primary'
}
const reviewColor: Record<string, string> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger'
}
const reviewLabel: Record<string, string> = {
  pending: '待审核',
  approved: '已通过',
  rejected: '已拒绝'
}

interface ActItem { id: number; type: string; reviewStatus: string; title: string; cover: string; date: string; location: string; status: string; fee: number; organizer: string; orgAvatar: string; publisher: { name: string; avatar: string; role: string }; deadline: string; description: string; registered: number }

const list = ref<ActItem[]>(activityList as ActItem[])

const filtered = computed(() => {
  let items = list.value
  if (activeTab.value === '待审核') {
    items = items.filter(a => a.reviewStatus === 'pending')
  } else if (activeTab.value !== '全部') {
    items = items.filter(a => a.type === activeTab.value)
  }
  if (searchText.value) {
    const q = searchText.value.toLowerCase()
    items = items.filter(a => a.title.toLowerCase().includes(q) || a.publisher.name.toLowerCase().includes(q))
  }
  return items
})

const countByType = (t: string) => {
  if (t === '全部') return list.value.length
  if (t === '待审核') return list.value.filter(a => a.reviewStatus === 'pending').length
  return list.value.filter(a => a.type === t).length
}

/* ---- 审核 ---- */
const onApprove = (row: ActItem) => {
  row.reviewStatus = 'approved'
  ElMessage.success('已通过审核')
}
const onReject = (row: ActItem) => {
  row.reviewStatus = 'rejected'
  ElMessage.success('已拒绝')
}

/* ---- 删除 ---- */
const onDelete = (row: ActItem) => {
  ElMessageBox.confirm(`确定删除「${row.title}」？`, '删除确认', { type: 'warning' })
    .then(() => { list.value = list.value.filter(a => a.id !== row.id); ElMessage.success('已删除') })
    .catch(() => {})
}

/* ---- 新建/编辑 ---- */
const showForm = ref(false)
const isEdit = ref(false)

const emptyForm = (): ActItem => ({
  id: 0, type: '平台活动', reviewStatus: 'approved', title: '', cover: 'https://picsum.photos/seed/newact/400/240', date: '', location: '', status: '报名中', fee: 0, organizer: '平台运营', orgAvatar: 'https://picsum.photos/seed/admin/100/100', publisher: { name: '平台运营', avatar: 'https://picsum.photos/seed/admin/100/100', role: '平台' }, deadline: '', description: '', registered: 0
})
const form = reactive<ActItem>(emptyForm())

const onAdd = () => { isEdit.value = false; Object.assign(form, emptyForm()); showForm.value = true }
const onEdit = (row: ActItem) => { isEdit.value = true; Object.assign(form, row); showForm.value = true }

const onSave = () => {
  if (!form.title.trim()) return ElMessage.warning('请填写活动标题')
  if (isEdit.value) {
    const idx = list.value.findIndex(a => a.id === form.id)
    if (idx > -1) list.value[idx] = { ...list.value[idx], ...form }
    ElMessage.success('已保存')
  } else {
    list.value.unshift({ ...form, id: Date.now(), type: '平台活动', reviewStatus: 'approved', publisher: { name: '平台运营', avatar: 'https://picsum.photos/seed/admin/100/100', role: '平台' }, organizer: '平台运营', orgAvatar: 'https://picsum.photos/seed/admin/100/100' })
    ElMessage.success('已发布')
  }
  showForm.value = false
}
</script>

<template>
  <div class="activity-admin">
    <el-card>
      <div class="toolbar">
        <el-input v-model="searchText" placeholder="搜索标题或发布者" clearable style="width: 280px" />
        <span class="total-info">共 {{ filtered.length }} 条</span>
        <el-button type="primary" :icon="Plus" @click="onAdd">发布活动</el-button>
      </div>

      <el-tabs v-model="activeTab">
        <el-tab-pane v-for="t in typeTabs" :key="t" :name="t">
          <template #label>
            <span>{{ t }}</span>
            <el-badge :value="countByType(t)" class="type-badge" />
          </template>
        </el-tab-pane>
      </el-tabs>

      <el-table :data="filtered" stripe style="width:100%" empty-text="暂无活动">
        <el-table-column label="封面" width="100">
          <template #default="{ row }">
            <el-image :src="row.cover" fit="cover" style="width:72px;height:54px;border-radius:4px" :preview-src-list="[row.cover]" preview-teleported />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="活动标题" min-width="240" show-overflow-tooltip />
        <el-table-column label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="typeColor[row.type] as any" size="small">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布者" width="140">
          <template #default="{ row }">
            <div class="user-cell">
              <img :src="row.publisher.avatar" class="user-avatar" />
              <div>
                <div class="user-name">{{ row.publisher.name }}</div>
                <el-tag size="small" :type="row.publisher.role === '平台' ? 'primary' : 'info'">{{ row.publisher.role }}</el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="110" sortable />
        <el-table-column prop="location" label="地点" width="140" show-overflow-tooltip />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.status === '报名中' ? 'danger' : 'info'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="registered" label="已报名" width="80" sortable />
        <el-table-column label="审核" width="90">
          <template #default="{ row }">
            <el-tag :type="reviewColor[row.reviewStatus] as any" size="small">{{ reviewLabel[row.reviewStatus] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <template v-if="row.reviewStatus === 'pending'">
              <el-button size="small" type="success" @click="onApprove(row)">通过</el-button>
              <el-button size="small" type="danger" @click="onReject(row)">拒绝</el-button>
            </template>
            <el-button size="small" @click="onEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除？" @confirm="onDelete(row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 发布/编辑活动对话框 -->
    <el-dialog v-model="showForm" :title="isEdit ? '编辑活动' : '发布活动'" width="680px" destroy-on-close>
      <el-form label-width="100px">
        <el-form-item label="活动标题" required>
          <el-input v-model="form.title" placeholder="请输入活动标题" />
        </el-form-item>
        <el-form-item label="封面图">
          <CoverUploader v-model="form.cover" :size="300" />
        </el-form-item>
        <el-form-item label="活动日期">
          <el-date-picker v-model="form.date" type="date" value-format="YYYY-MM-DD" placeholder="选择日期" style="width:240px" />
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="form.location" placeholder="活动地点" style="width:320px" />
        </el-form-item>
        <el-form-item label="报名截止">
          <el-date-picker v-model="form.deadline" type="date" value-format="YYYY-MM-DD" placeholder="选择截止日期" style="width:240px" />
        </el-form-item>
        <el-form-item label="费用（元）">
          <el-input-number v-model="form.fee" :min="0" />
        </el-form-item>
        <el-form-item label="活动状态">
          <el-radio-group v-model="form.status">
            <el-radio value="报名中">报名中</el-radio>
            <el-radio value="未开始">未开始</el-radio>
            <el-radio value="已结束">已结束</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="已报名数">
          <el-input-number v-model="form.registered" :min="0" />
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入活动详细描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showForm = false">取消</el-button>
        <el-button type="primary" @click="onSave">{{ isEdit ? '保存' : '发布' }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.activity-admin { max-width: 1400px; margin: 0 auto; }
.toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
.toolbar .total-info { font-size: 13px; color: #909399; flex: 1; }
.type-badge { margin-left: 8px; vertical-align: top; }
.user-cell { display: flex; align-items: center; gap: 8px; }
.user-avatar { width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0; }
.user-name { font-size: 12px; font-weight: 500; margin-bottom: 1px; }
</style>
